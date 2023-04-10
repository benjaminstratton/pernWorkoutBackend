const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "18266",
    host: "localhost",
    port: 5432,
    database: "workout_api"
});

module.exports = pool;