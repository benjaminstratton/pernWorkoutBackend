// Requirements
const express = require("express");
const router = require("express").Router();
const pool = require("../config/db");
const authorization = require("../middlewares/authorization");

// Get user_name and ALL workout logs
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, w.workout_id, w.log_title, e.ex_id, e.ex_name, e.sets, e.weight, e.reps FROM users AS u LEFT JOIN workout_log AS w ON u.user_id = w.user_id LEFT JOIN exercise AS e ON e.workout_id = w.workout_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create workout log
router.post("/workout", authorization, async (req, res) => {
  try {
    const { title } = req.body;
    const newLog = await pool.query(
      "INSERT INTO workout_log(user_id, log_title) VALUES ($1, $2) RETURNING *",
      [req.user.id, title]
    );
    res.json(newLog.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create exercise
router.post("/exercise/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise, sets, weight, reps } = req.body;
    const newExercise = await pool.query(
      "INSERT INTO exercise(workout_id, ex_name, sets, weight, reps) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, exercise, sets, weight, reps]
    );
    res.json(newExercise.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update workout log
router.put("/workout/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateLogTitle = await pool.query(
      "UPDATE workout_log SET log_title = $1 WHERE workout_id = $2 AND user_id = $3 RETURNING *",
      [title, id, req.user.id]
    );
    if (updateLogTitle.rows.length === 0) {
      return res.json("This log is not yours!");
    }
    res.json("Log updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Update exercise
router.put("/exercise/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise, sets, weight, reps } = req.body;
    const addSet = await pool.query(
      "UPDATE exercise SET exercise = $1, sets = $2, weight = $3, reps = $4 WHERE ex_id = $5 RETURNING *",
      [exercise, sets, weight, reps, id]
    );
    if (addSet.rows.length === 0) {
      return res.json("Failed");
    }
    res.json("Added Sets");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete workout log
router.delete("/workout/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLog = await pool.query(
      "DELETE FROM workout_log WHERE workout_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if (deleteLog.rows.length === 0) {
      return res.json("This log is not yours!");
    }
    res.json("Log deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete exercise
router.delete("/exercise/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExercise = await pool.query(
      "DELETE FROM exercise WHERE ex_id = $1 RETURNING *",
      [id]
    );
    if (deleteExercise.rows.length === 0) {
      return res.json("Failed");
    }
    res.json("Exercise deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
