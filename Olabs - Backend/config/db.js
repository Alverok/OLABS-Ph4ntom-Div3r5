// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost',
  database: 'olab', // Your PostgreSQL database name
  password: 'Ak@051005', // Your PostgreSQL password
  port: 5433,
});

module.exports = pool;
