const Pool = require("pg").Pool;

//database connect
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "unicorn",
  password: "admin",
  port: 5432,
});

module.exports = pool;
