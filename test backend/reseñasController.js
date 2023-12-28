const express = require('express');
const mssql = require('mssql');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pool = await mssql.connect();
        const result = await pool
            .request()
            .query('SELECT * FROM Reseñas');

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todas las reseñas.' });
    }
});

router.post('/subir-resena', async (req, res) => {
    try {
        const { comentario, calificación, usuario /* otras propiedades */ } = req.body;

        // Validaciones
        if (!comentario || !calificación || !usuario /* otras validaciones */) {
            return res.status(400).json({ success: false, message: 'Datos incompletos o inválidos.' });
        }

        // Obtener el nombre del usuario
        const pool = await mssql.connect();
        const userResult = await pool
            .request()
            .input('usuario', mssql.VarChar(100), usuario)
            .query('SELECT Nombre FROM Usuarios WHERE Usuario = @usuario');

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        const nombreUsuario = userResult.recordset[0].Nombre;

        // Validaciones y procesamiento de datos
        const result = await pool
            .request()
            .input('comentario', mssql.NVarChar, comentario)
            .input('calificación', mssql.Int, calificación)
            .input('usuario', mssql.VarChar(100), usuario)
            .input('nombreUsuario', mssql.VarChar(100), nombreUsuario)
            // Añadir otras entradas según sea necesario
            .query(`
                INSERT INTO Reseñas (Comentario, Calificación, Usuario, NombreUsuario)
                VALUES (@comentario, @calificación, @usuario, @nombreUsuario);
            `);

        res.json({ success: true, message: 'Reseña agregada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al agregar la reseña.' });
    }
});




module.exports = router;