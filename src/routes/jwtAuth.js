// Requirements
const express = require("express");
const router = require("express").Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middlewares/validInfo");
const authorization = require("../middlewares/authorization")

// Signup
router.post("/signup", validInfo, async (req, res) => {
  try {
    // Destructure req.body
    const { name, email, password, dob, sex, height } = req.body;
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).send("User already exists");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // Enter user in database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, date_of_birth, user_sex, user_height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, bcryptPassword, dob, sex, height]
    );
    // Generate webtoken
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login
router.post("/login", validInfo, async (req, res) => {
  try {
    // Destructure req.body
    const { email, password } = req.body;
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    // Compare passwords
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    // Generate webtoken
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
