const express = require('express');
const mssql = require('mssql');
const router = express.Router();
const { exec } = require('child_process');


router.get('/', async (req, res) => {
    try {
        const pool = await mssql.connect();
        const result = await pool.request().query('SELECT * FROM Servidores');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servidores' });
    }
});
// Obtener detalles de un servidor por nombre
router.get('/detalles', async (req, res) => {
    try {
        const { nombre } = req.query; // Obtén el valor del parámetro desde la consulta

        // Verifica si el nombre está presente
        if (!nombre) {
            return res.status(400).json({ error: 'El parámetro nombre es obligatorio' });
        }

        const pool = await mssql.connect();
        const result = await pool
            .request()
            .input('nombre', mssql.VarChar, nombre) // Declaración del parámetro
            .query('SELECT * FROM Servidores WHERE Nombre = @nombre');

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalles del servidor' });
    }
});

router.post('/actualizarEstado', async (req, res) => {
    try {
        const { nombre, nuevoEstado, nuevoIniciador } = req.body; // Obtén valores desde el cuerpo de la solicitud

        // Verifica si los valores requeridos están presentes
        if (!nombre || !nuevoEstado || !nuevoIniciador) {
            return res.status(400).json({ error: 'Los parámetros nombre, nuevoEstado y nuevoIniciador son obligatorios' });
        }

        const pool = await mssql.connect();
        await pool
            .request()
            .input('nombre', mssql.VarChar, nombre)
            .input('estado', mssql.VarChar, nuevoEstado)
            .input('iniciador', mssql.VarChar, nuevoIniciador)
            .query('UPDATE Servidores SET Estado = @estado, Iniciador = @iniciador WHERE Nombre = @nombre');

        res.status(200).send('Estado del servidor actualizado correctamente.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado del servidor' });
    }
});


router.post('/iniciar', async (req, res) => {
    try {
        const { nombre, comando } = req.body;

        if (!nombre || !comando) {
            return res.status(400).json({ error: 'Los parámetros nombre y comando son obligatorios' });
        }

        // Ejecutar el comando en la consola del servidor
        exec(comando, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el comando: ${error.message}`);
                return res.status(500).json({ error: 'Error al ejecutar el comando' });
            }

            console.log(`Comando ejecutado: ${comando}`);
            console.log(`Salida: ${stdout}`);
            console.error(`Errores: ${stderr}`);

            // Puedes enviar una respuesta al cliente si es necesario
            res.status(200).json({ mensaje: 'Comando ejecutado exitosamente' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar el servidor' });
    }
});

module.exports = router;

      
  