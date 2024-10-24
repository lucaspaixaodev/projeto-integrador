const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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

// Rota de registro
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
        return;
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao criar hash da senha:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ error: 'Erro ao fazer login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
