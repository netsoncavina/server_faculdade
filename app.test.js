const { response } = require("express");
const request = require("supertest");
const app = require("./app");

describe("Alunos", () => {
  describe("POST tests", () => {
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
  });
  describe("GET tests", () => {
    it("GET /alunos --> Array de alunos", () => {
      return request(app)
        .get("/alunos")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                __v: expect.any(Number),
                _id: expect.any(String),
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

    it("GET /alunos/:ra --> Aluno especifico por RA", () => {
      let ra = "0";
      return request(app)
        .get(`/alunos/${ra}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                __v: expect.any(Number),
                _id: expect.any(String),
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
    it("GET /alunos/:ra --> Array vazio se não encontrado", () => {
      let ra = "444444";
      return request(app)
        .get(`/alunos/${ra}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(expect.arrayContaining([]));
        });
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
  });
  describe("PATCH tests", () => {
    it("PATCH /alunos/:ra --> atualiza os dados de um aluno", () => {
      let ra = "0";
      return request(app)
        .patch(`/alunos/${ra}`)
        .send({
          curso: "Tester",
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
  });
  describe("DELETE tests", () => {
    it("DELETE /alunos/:ra --> exclui um aluno", () => {
      let ra = "0";
      return request(app)
        .delete(`/alunos/${ra}`)
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
});
