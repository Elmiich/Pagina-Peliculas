const express = require('express');
const mssql = require('mssql');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const pool = await mssql.connect();
        const result = await pool.request().query('SELECT * FROM Peliculas');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});

router.get('/generos', async (req, res) => {
    try {
        const pool = await mssql.connect();
        const result = await pool.request().query('SELECT * FROM Generos');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los géneros' });
    }
});

// Modifica la consulta SQL en el backend
router.get('/detalles', async (req, res) => {
    try {
        const pool = await mssql.connect();
        const result = await pool
            .request()
            .query(`
                SELECT P.*, PG.Genero
                FROM Peliculas P
                JOIN Peliculas_Generos PG ON P.Titulo = PG.Titulo
                WHERE PG.Genero = '${req.query.genero}'
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los géneros' });
    }
});

router.get('/buscar', async (req, res) => {
    try {
        const terminoBusqueda = req.query.termino;

        const pool = await mssql.connect();
        const result = await pool
            .request()
            .query(`SELECT * FROM Peliculas WHERE Titulo LIKE '%${terminoBusqueda}%'`);

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar la búsqueda' });
    }
});

  module.exports = router;
  