if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    override: false,
    quiet: true
  });
}

const mysql = require('mysql2/promise');

const databaseUrl = process.env.DATABASE_URL;

console.log('DEBUG - Variables de entorno disponibles:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('MYSQL')));
console.log('DEBUG - Valor de DATABASE_URL:', process.env.DATABASE_URL);

if (!databaseUrl) {
  throw new Error('Falta la variable de entorno DATABASE_URL');
}

const pool = mysql.createPool(databaseUrl);

module.exports = pool;