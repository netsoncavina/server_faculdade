const mongoose = require("mongoose");

const ProfessorSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  formacao: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Professores", ProfessorSchema);
