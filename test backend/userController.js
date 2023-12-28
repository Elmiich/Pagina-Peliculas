const express = require('express');
const mssql = require('mssql');
const router = express.Router();

// Endpoint para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await mssql.connect();
    const result = await pool.request().query('SELECT * FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).send('Error interno del servidor');
  }
});


module.exports = router;
