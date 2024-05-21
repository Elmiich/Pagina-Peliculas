const express = require('express');
const mssql = require('mssql');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const qr = require('qrcode');

function generateToken() {
    const token = uuidv4();
    return token;
}

router.get('/', async (req, res) => {
    try {
        const token = generateToken();
        const loginPageUrl = `http://caduto.online:4018/LogIn/LoginSinQR.html?token=${token}`;
        const qrCodeData = await qr.toDataURL(loginPageUrl);
        res.json({ success: true, qrCodeData, token });
    } catch (error) {
        console.error('Error generando código QR:', error);
        res.status(500).json({ error: 'Error generando código QR' });
    }
});

router.post('/qr', async (req, res) => {
    const { username, password, token } = req.body;

    if (!username || !password || !token) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    try {
        const pool = await mssql.connect();
        const request = pool.request();
        request.input('username', mssql.VarChar, username);
        request.input('password', mssql.VarChar, password);
        request.input('token', mssql.VarChar, token);
        const result = await request.query(`SELECT * FROM Usuarios WHERE Usuario = @username AND Contraseña = @password`);

        if (result.recordset.length > 0) {
            await request.query(`UPDATE Usuarios SET Token = @token WHERE Usuario = @username`);

            const usuario = result.recordset[0];
            res.status(200).json({ 
                success: true, 
                Usuario: usuario.Usuario, 
                Nombre: usuario.Nombre, 
                Foto: usuario.Foto 
            });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ success: false, message: 'Error al autenticar usuario' });
    }
});

router.get('/validateToken', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token es requerido' });
    }

    try {
        const pool = await mssql.connect();
        const request = pool.request();
        request.input('token', mssql.VarChar, token);
        const result = await request.query(`SELECT * FROM Usuarios WHERE Token = @token`);

        if (result.recordset.length > 0) {
            const usuario = {
                Usuario: result.recordset[0].Usuario,
                Nombre: result.recordset[0].Nombre,
                Foto: result.recordset[0].Foto
            };
            res.status(200).json({ success: true, ...usuario });
        } else {
            res.status(401).json({ success: false, message: 'Token no válido' });
        }
    } catch (error) {
        console.error('Error al validar el token:', error);
        res.status(500).json({ success: false, message: 'Error al validar el token' });
    }
});

module.exports = router;
