const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para obter todos os produtos
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
      return;
    }
    res.json(results);
  });
});

// Rota para obter um produto específico
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro ao buscar produto' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

