const express = require('express');
const app = express();
const PORT = 3000;
let data = require('./data/data.json');

app.use(express.json());

app.get('/personagens', (req, res) => {
    res.status(200).json(data);
});

app.get("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const personagemId = data.find((item) => item.id == id);

  if (personagemId) {
    res.json(personagemId);
  } else {
    res.status(404).json({ error: "Personagem não encontrado" });
  }
});

app.post('/personagem', (req, res) => {
  const { id, name, gender } = req.body;

  if (!id || !name || !gender) {
    res.status(400).json({ error: "Dados incompletos. Certifique-se de enviar o ID, nome e gênero." });
  } else {
    data.push({ id, name, gender });
    res.status(201).json({ id, name, gender });
  }
});


app.put("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { gender } = req.body;

  const personagem = data.find((item) => item.id == id);

  if (!personagem) {
    return res.status(404).json({error: "Personagem não encontrado"});
  } 
  personagem.name = name;
  personagem.gender = gender;

  res.json(personagem);
});

app.delete("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const personagemFilter = data.filter((item) => item.id != id);
  const personagemIndex = data.findIndex((index) => index.id == id);

  if (personagemIndex < 0) {
      res.status(404).json({error: "Esse personagem não pode ser deletado"});
  } else {
      data = personagemFilter;
      res.json(data);
  }
});

app.listen(PORT, () => {
    console.log('Sevidor Iniciado');
});