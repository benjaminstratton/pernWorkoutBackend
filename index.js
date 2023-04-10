// Requirements
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json())
app.use(cors())

// Routes


// Listening
app.listen(5000, () => {
    console.log("server is running on port 5000")
})