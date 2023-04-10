// Requirements
const router = require("express").Router();
const pool = require("../config/db")
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", async (req, res) => {
    try {
        // Destructure req.body
        const { name, email, password, dob, sex, height } = req.body;
        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }
        // Hash password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        // Enter user in database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password, date_of_birth, user_sex, user_height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, email, bcryptPassword, dob, sex, height]);
        res.json(newUser.rows[0])
        // Generate webtoken

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;