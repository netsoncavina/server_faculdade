const mongoose = require("mongoose");

const AlunoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  ra: {
    type: Number,
    required: true,
  },
  semestreAtual: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Alunos", AlunoSchema);
