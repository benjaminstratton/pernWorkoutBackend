// Requirements
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Signup and Login
app.use("/auth", require("./src/routes/jwtAuth"));

// Dashboard
app.use("/dashboard", require("./src/routes/dash"));

// Listening
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
