const mongoose = require('mongoose');

// Definir o schema (estrutura) para os dados do usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },  // Campo "nome" obrigatório
  email: { type: String, required: true },  // Campo "email" obrigatório
  idade: { type: Number, required: true }  // Campo "idade" obrigatório
});

// Criar o modelo "Usuario" baseado no schema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar o modelo para poder usá-lo em outros arquivos
module.exports = Usuario;
