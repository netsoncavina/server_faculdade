const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
const alunosRoute = require("./routes/alunos");
app.use("/alunos", alunosRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

// CONNECTION
mongoose.connect(process.env.DB_CONNECTION, () => console.log("connected"));

app.listen(3000);
