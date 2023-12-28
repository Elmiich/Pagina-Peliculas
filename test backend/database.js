const argon2 = require('argon2');
require('dotenv').config({ path: './db.env' });
const sql = require('mssql');

// Configuración de conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Necesario si estás utilizando Azure SQL Database
    trustServerCertificate: true // Solo para desarrollo, NO utilizar en producción
  }
};

let pool;

async function connect() {
  pool = await sql.connect(dbConfig);
}

async function close() {
  if (pool) {
    await pool.close();
  }
}

module.exports = {
  connect,
  close,
  getPool: () => pool,
};
