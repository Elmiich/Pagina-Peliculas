const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('LogIn'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/LogIn/login.html');
  });
  
app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
