const express = require("express");
const router = express.Router();
const Aluno = require("../models/Aluno");

// GET
// Retorna todos os alunos
router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retorna um aluno com id especifico
router.get("/:alunoId", async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.alunoId);
    res.json(aluno);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Retorna alunos pelo nome
router.get("/aluno/:nome", async (req, res) => {
  const alunoRegex = new RegExp(req.params.nome, "i");

  try {
    const aluno = await Aluno.find({
      nome: alunoRegex,
    });
    res.json(aluno);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// POST
router.post("/", async (req, res) => {
  const aluno = new Aluno({
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento,
    curso: req.body.curso,
    ra: req.body.ra,
    semestreAtual: req.body.semestreAtual,
  });
  try {
    const savedAluno = await aluno.save();
    res.status(201).json(savedAluno);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE
router.delete("/:alunoId", async (req, res) => {
  try {
    const removedAluno = await Aluno.remove({ _id: req.params.alunoId });
    res.json(removedAluno);
  } catch (err) {
    res.send({ message: err });
  }
});

// UPDATE
router.patch("/:alunoId", async (req, res) => {
  try {
    const updatedAluno = await Aluno.updateOne(
      { _id: req.params.alunoId },
      {
        $set: {
          nome: req.body.nome,
          dataNascimento: req.body.dataNascimento,
          curso: req.body.curso,
          ra: req.body.ra,
          semestreAtual: req.body.semestreAtual,
        },
      }
    );
    res.json(updatedAluno);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
