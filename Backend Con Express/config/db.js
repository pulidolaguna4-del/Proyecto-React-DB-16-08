require('dotenv').config();
const mysql = require('mysql2/promise');

if (!process.env.DATABASE_URL) {
  throw new Error('Falta la variable de entorno DATABASE_URL');
}

const pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = pool;