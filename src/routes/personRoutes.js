const router = require("express").Router();
const Person = require("../models/person");

// CREATE //
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório" });
    return;
  }
  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person); //criando dados
    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// READ //
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// Get por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// UPDATE (PUT / PATCH) //
router.patch("/:id", async (req, res) => {
  //patch para atualizações parciais
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    if (updatedPerson.matchedCount === 0) {
      //validar se o usuário existe ou não
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// DELETE //
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  if (!person) {
    //validar se o usuário existe ou não
    res.status(422).json({ message: "Usuário não encontrado!" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
