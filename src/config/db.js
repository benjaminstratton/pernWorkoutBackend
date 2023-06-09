const Pool = require("pg").Pool;
require("dotenv").config()

const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const devConnect = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
}

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : devConnect,
  ssl: {
      rejectUnauthorized: false,
  },
});

module.exports = pool;
