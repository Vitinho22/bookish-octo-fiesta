// Importa o Express
const express = require('express');
const app = express();

// Define a porta do servidor
const port = 3000;

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('ola mundo!');
});

// Rota para a página "Sobre"
app.get('/sobre', (req, res) => {
  res.send('Esta é a página Sobre.');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); // Para que o Express entenda JSON nas requisições

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/bancoUsuarios', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

// Definir o esquema e o modelo de usuário
const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  idade: Number, // Adicionando idade ao esquema
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rota para adicionar um novo usuário
app.post('/usuarios', (req, res) => {
  const novoUsuario = new Usuario({
    nome: req.body.nome,   // Pegando o nome do corpo da requisição
    email: req.body.email, // Pegando o email do corpo da requisição
    idade: req.body.idade  // Pegando a idade do corpo da requisição
  });

  novoUsuario.save()
    .then(() => res.send('Usuário adicionado com sucesso!'))
    .catch(err => res.status(400).send('Erro ao adicionar usuário: ' + err));
});

// Rota para buscar todos os usuários
app.get('/usuarios', (req, res) => {
  Usuario.find()
    .then(usuarios => res.json(usuarios))
    .catch(err => res.status(500).send('Erro ao buscar usuários: ' + err));
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});


