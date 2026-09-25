if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    override: false,
    quiet: true
  });
}

const mysql = require('mysql2/promise');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Falta la variable de entorno DATABASE_URL');
}

const pool = mysql.createPool(databaseUrl);

module.exports = pool;