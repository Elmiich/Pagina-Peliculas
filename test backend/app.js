const express = require('express');
const mssql = require('mssql');
const path = require('path');
require('dotenv').config({ path: './db.env' });

const userController = require('./userController');
const peliculasController = require('./peliculasController');
const servidoresController = require('./servidoresController');
const resenasController = require('./reseñasController');
const perfilController = require('./perfilController');
const qrcontroller = require('./qrcontroller');

const app = express();
const port = 4018;
const HOST = '0.0.0.0';
const cors = require('cors');
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

app.use(express.json());

app.use('/users', userController);
app.use('/peliculas', peliculasController);
app.use('/peliculas/generos', peliculasController);
app.use('/peliculas/detalles', peliculasController);
app.use('/peliculas/buscar', peliculasController);
app.use('/servidores', servidoresController);
app.use('/servidores/detalles', servidoresController);
app.use('/servidores/iniciar', servidoresController);
app.use('/servidores/actualizarEstado', servidoresController);
app.use('/resenas/subir-resena', resenasController);
app.use('/resenas', resenasController);
app.use('/perfil', perfilController);
app.use('/login', qrcontroller);
app.use('/login/qr', qrcontroller);
app.use('/login/validateToken', qrcontroller);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://${HOST}:${port}`);
});

app.use(express.static(path.join(__dirname, '../Servidor')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Servidor/Main/Index.html'));
});

mssql.connect(config, (err) => {
  if (err) {
    console.error('Error de conexión a SQL Server:', err);
  } else {
    console.log('Conexión establecida con SQL Server');
  }
});
