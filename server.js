const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: '123',
  database: 'AutoFormulario'
});

db.connect((error) => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

app.post('/autos', (req, res) => {
  const { marca, modelo } = req.body;
  const query = `INSERT INTO autos (marca, modelo) VALUES ('${marca}', '${modelo}')`;

  db.query(query, (error) => {
    if (error) {
      console.error('Error insertando en la base de datos:', error);
      res.status(500).send('Error insertando en la base de datos');
      return;
    }

    res.status(200).send('Auto insertado correctamente');
  });
});

app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});