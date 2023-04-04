const mongoose = require("mongoose");

const cadastroSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  usuario: {
    type: String,
    default: true,
  },
  senha: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Cadastro", cadastroSchema);
