const { response } = require("express");
const request = require("supertest");
const app = require("./app");

describe("Alunos API", () => {
  it("GET /alunos --> Array de alunos", () => {
    return request(app)
      .get("/alunos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              nome: expect.any(String),
              dataNascimento: expect.any(String),
              curso: expect.any(String),
              ra: expect.any(Number),
              semestreAtual: expect.any(Number),
            }),
          ])
        );
      });
  });
  it("GET /alunos/:alunoID --> Aluno especifico por ID", () => {
    let id = "62bd246b1503cf822b26a68c";
    return request(app)
      .get(`/alunos/${id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            __v: 0,
            _id: "62bd246b1503cf822b26a68c",
            nome: "Teste",
            dataNascimento: "2001-01-01T02:00:00.000Z",
            curso: "Teste",
            ra: 0,
            semestreAtual: 1,
          })
        );
      });
  });
  it("GET /alunos/:alunoID --> 404 se não encontrado", () => {
    let id = "00000";
    return request(app)
      .get(`/alunos/${id}`)
      .expect("Content-Type", /json/)
      .expect(404);
  });
  it("GET /alunos/aluno/:nome --> Aluno especifico por nome", () => {
    let nome = "Teste";
    return request(app)
      .get(`/alunos/aluno/${nome}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              __v: 0,
              _id: "62bd246b1503cf822b26a68c",
              nome: "Teste",
              dataNascimento: "2001-01-01T02:00:00.000Z",
              curso: "Teste",
              ra: 0,
              semestreAtual: 1,
            }),
          ])
        );
      });
  });
  it("GET /alunos/aluno/:nome --> Array vazio se não encontrado", () => {
    let nome = "qualquercoisa";
    return request(app)
      .get(`/alunos/aluno/${nome}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.arrayContaining([]));
      });
  });
  it("POST /alunos --> cadastra um aluno", () => {
    return request(app)
      .post("/alunos")
      .send({
        nome: "Teste",
        dataNascimento: "01/01/01",
        curso: "Teste",
        ra: "00000000",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            __v: expect.any(Number),
            _id: expect.any(String),
            nome: "Teste",
            dataNascimento: expect.any(String),
            curso: "Teste",
            ra: 0,
            semestreAtual: 1,
          })
        );
      });
  });
  it("PATCH /alunos/:alunoID --> atualiza os dados de um aluno", () => {
    let id = "62bd246b1503cf822b26a68c";
    return request(app)
      .patch(`/alunos/${id}`)
      .send({
        curso: "Test",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1,
          })
        );
      });
  });
  it("DELETE /alunos/:alunoID --> exclui um aluno", () => {
    let id = "62bd276bd5b9b6cfde26ce89";
    return request(app)
      .delete(`/alunos/${id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            acknowledged: true,
            deletedCount: 1,
          })
        );
      });
  });
});
