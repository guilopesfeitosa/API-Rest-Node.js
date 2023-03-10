//config inicial //
const mongoose = require("mongoose"); //importando o mongoose
const express = require("express"); //importando o express
const app = express(); //iniciando o express
require("dotenv").config();

// forma de ler o JSON - middlewares //
app.use(
  express.urlencoded({
    extended: true, //iniciando a configuração para ler JSON
  })
);
app.use(express.json());

// rotas  da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// criar uma rota - endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi express!" }); //enviando um json com uma chave "message" e valor "Oi express!"
});

//entregar uma porta //
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.el1cbhd.mongodb.net/dataBaseApi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(3000); //indicando uma porta para o express
  })
  .catch((err) => console.error(err));
