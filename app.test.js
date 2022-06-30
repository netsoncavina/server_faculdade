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
  it("GET /alunos/:alunoID --> aluno especifico por ID", () => {
    let id = "62b6b11bb0439a2da0a12848";
    return request(app)
      .get(`/alunos/${id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: "62b6b11bb0439a2da0a12848",
            nome: "netson",
            dataNascimento: "1998-04-01T03:00:00.000Z",
            curso: "Desenvolvimento de Software Multiplataforma",
            ra: 45515044835,
            semestreAtual: 3,
            __v: 0,
          })
        );
      });
  });
  it("GET /alunos/:alunoID --> 404 se não encontrado", () => {});
  it("GET /alunos/aluno/:nome --> aluno especifico por nome", () => {
    let nome = "Netson";
    return request(app)
      .get(`/alunos/aluno/${nome}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: "62b6b11bb0439a2da0a12848",
              nome: "netson",
              dataNascimento: "1998-04-01T03:00:00.000Z",
              curso: "Desenvolvimento de Software Multiplataforma",
              ra: 45515044835,
              semestreAtual: 3,
              __v: 0,
            }),
          ])
        );
      });
  });
  it("GET /alunos/aluno/:nome --> 404 se não encontrado", () => {});
  it("POST /alunos --> cadastra um aluno", () => {});
  it("DELETE /alunos/:alunoID --> exclui um aluno", () => {});
  it("PATCH /alunos/:alunoID --> atualiza os dados de um aluno", () => {});
});
// describe("Test the root path", () => {
//   test("It should response the GET method", () => {
//     return request(app)
//       .get("/")
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//       });
//   });
// });
