const express = require("express");
const router = express.Router();
const Professor = require("../models/Professor");

// GET
// Retorna todos os professores
router.get("/", async (req, res) => {
  try {
    const professores = await Professor.find();
    res.json(professores);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retorna um professor com CPF especifico
router.get("/:professorCPF", async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.professorCPF);
    res.json(professor);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Retorna professores pelo nome
router.get("/professor/:nome", async (req, res) => {
  const professorRegex = new RegExp(req.params.nome, "i");

  try {
    const professor = await Professor.find({
      nome: professorRegex,
    });
    res.json(professor);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// POST
router.post("/", async (req, res) => {
  const professor = new Professor({
    nome: req.body.nome,
    formacao: req.body.formacao,
    dataNascimento: req.body.dataNascimento,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  try {
    const savedProfessor = await professor.save();
    res.status(201).json(savedProfessor);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE
router.delete("/:professorCPF", async (req, res) => {
  try {
    const removedProfessor = await Professor.remove({
      cpf: req.params.professorCPF,
    });
    res.json(removedProfessor);
  } catch (err) {
    res.send({ message: err });
  }
});

// UPDATE
router.patch("/:professorCPF", async (req, res) => {
  try {
    const updatedProfessor = await Professor.updateOne(
      { cpf: req.params.professorCPF },
      {
        $set: {
          nome: req.body.nome,
          formacao: req.body.formacao,
          dataNascimento: req.body.dataNascimento,
          email: req.body.email,
          cpf: req.body.cpf,
        },
      }
    );
    res.json(updatedProfessor);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
