const { response } = require("express");
const request = require("supertest");
const app = require("./app");

describe("Alunos API", () => {
  it("GET /alunos --> array de alunos", () => {
    return request(app)
      .get("/alunos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              __v: expect.any(Number),
              _id: expect.any(Number),
              nome: expect.any(String),
              dataNascimento: expect.any(Date),
              curso: expect.any(String),
              ra: expect.any(Number),
              semestreAtual: expect.any(Number),
            }),
          ])
        );
      });
  });
  it("GET /alunos/:alunoID --> aluno especifico por ID", () => {});
  it("GET /alunos/:alunoID --> 404 se não encontrado", () => {});
  it("GET /alunos/aluno/:nome --> aluno especifico por nome", () => {});
  it("GET /alunos/aluno/:nome --> 404 se não encontrado", () => {});
  it("POST /alunos --> cadastra um aluno", () => {});
  it("DELETE /alunos/:alunoID --> exclui um aluno", () => {});
  it("PATCH /alunos/:alunoID --> atualiza os dados de um aluno", () => {});
});
