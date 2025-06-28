require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

async function connectDB() {
  if (pool) return pool;

  pool = await mysql.createPool({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true, 
  });

  console.log('Connected to MySQL database.');
  return pool;
}


async function query(sql, params) {
  const pool = await connectDB();
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = {
  connectDB,
  query,
};
