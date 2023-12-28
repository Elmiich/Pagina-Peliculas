// File: perfilController.js
const express = require('express');
const mssql = require('mssql');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { usuario, nombre, clave } = req.body;
        // Procesa y actualiza la información del perfil en la base de datos (utiliza SQL para actualizar)
        const pool = await mssql.connect();

        // Verifica qué campos se están actualizando y crea la consulta SQL dinámicamente
        let updateQuery = 'UPDATE Usuarios SET';
        let updatedFields = [];

        if (nombre) {
            updatedFields.push(` Nombre = '${nombre}'`);
        }

        if (clave) {
            updatedFields.push(` Clave = '${clave}'`);
        }

        // Agrega más campos según sea necesario

        updateQuery += updatedFields.join(',');

        updateQuery += ` WHERE Usuario = '${usuario}'`;

        // Ejecuta la consulta de actualización
        await pool.request().query(updateQuery);

        res.json({ success: true, message: 'Perfil actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar el perfil.' });
    }
});

module.exports = router;
