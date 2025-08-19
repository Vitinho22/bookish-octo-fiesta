
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializando o Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/bancoUsuarios', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

// Definindo o modelo de dados
const Usuario = require('./userModel');

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
  Usuario.find()
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao obter usuários', error: err });
    });
});

// Rota para cadastrar um usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, idade } = req.body;

  const novoUsuario = new Usuario({ nome, email, idade });

  novoUsuario.save()
    .then(() => {
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
