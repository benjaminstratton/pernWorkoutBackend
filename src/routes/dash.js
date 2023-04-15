// Requirements
const express = require("express");
const router = require("express").Router();
const pool = require("../config/db");
const authorization = require("../middlewares/authorization");

// Get user_name and ALL runs
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, r.run_id, r.date, r.distance, r.time FROM users AS u LEFT JOIN runs AS r ON u.user_id = r.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create run workout
router.post("/runs", authorization, async (req, res) => {
  try {
    const { date, distance, time } = req.body;
    const newRun = await pool.query(
      "INSERT INTO runs (user_id, date, distance, time) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, date, distance, time]
    );
    res.json(newRun.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update run workout
router.put("/runs/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, distance, time } = req.body;
    const updateRun = await pool.query(
      "UPDATE runs SET date = $1, distance = $2, time = $3 WHERE run_id = $4 AND user_id = $5 RETURNING *",
      [date, distance, time, id, req.user.id]
    );
    if (updateRun.rows.length === 0) {
      return res.json("This run is not yours!");
    }
    res.json("Run updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete workout log
router.delete("/runs/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRun = await pool.query(
      "DELETE FROM runs WHERE run_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if (deleteRun.rows.length === 0) {
      return res.json("This run is not yours!");
    }
    res.json("Run deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
