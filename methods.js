const express = require('express');
const app = express();
const PORT = 3000;
const errorsMessage = require('./errors/error');
let data = require('./data/data.json');

app.use(express.json());

app.get('/personagens', (req, res) => {
    res.status(200).json(data);
});

app.get("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const personagemId = data.find((item) => item.id == id);

  if (personagemId) {
    res.status(200).json(personagemId);
  } else {
    res.status(404).json({ error: errorsMessage.defaultError });
  }
});

app.post('/personagem', (req, res) => {
  const { id, name, gender } = req.body;

  if (!id || !name || !gender) {
    res.status(404).json({ error: errorsMessage.postError });
  } else {
    data.push({ id, name, gender });
    res.status(200).json({ id, name, gender });
  }
});


app.put("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { gender } = req.body;

  const personagem = data.find((item) => item.id == id);

  if(!name && !gender) {
    return res.status(404).json({error: errorsMessage.putError });
  }

  if (!personagem) {
    return res.status(404).json({error: errorsMessage.defaultError });
  } 

  personagem.name = name || personagem.name;
  personagem.gender = gender || personagem.gender;

  // if (name) {
  //   personagem.name = name
  // } else {
  //   personagem.name = personagem.name
  // }

  // if (gender) {
  //   personagem.gender = gender
  // } else {
  //   personagem.gender = personagem.gender
  // }


  res.status(200).json(personagem);
});

app.delete("/personagem/:id", (req, res) => {
  const { id } = req.params;
  const personagemIndex = data.findIndex((index) => index.id == id);

  if (personagemIndex < 0) {
    res.status(404).json({ error: errorsMessage.deleteError });
  } else {
    data.splice(personagemIndex, 1);
    res.status(200).json(data);
  }
});


app.listen(PORT, () => {
    console.log('Sevidor Iniciado');
});