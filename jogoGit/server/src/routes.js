const express = require('express');
const routes = express.Router();
const CreateServer = require('./models/serverSchema');
routes.get('/getlist', (req, res) => {
    CreateServer.find({})
    .then((documentos) => {
      console.log('Documentos encontrados:', documentos);
      return res.status(200).json(documentos);
    })
    .catch((erro) => {
      console.error('Erro ao buscar servidor:', erro);
    });
});
routes.post('/entrada', async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json('Nenhum id foi enviado.');
  }

  try {
    const doc = await CreateServer.findOne({ idServer: id });

    if (!doc) {
      console.log('Nenhum servidor encontrado com o id fornecido');
      return res.status(404).json('Nenhum servidor encontrado com o id fornecido');
    }

    doc.online = (doc.online || 0) + 1;

    const updatedDoc = await doc.save();

    console.log('Servidor atualizado com sucesso:', updatedDoc);
    res.status(200).json('Servidor atualizado com sucesso')
  } catch (err) {
    console.error('Erro ao encontrar ou salvar o servidor:', err);
    res.status(500).json('Erro interno do servidor');
  }
});
routes.post('/saida', async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json('Nenhum id foi enviado.');
  }

  try {
    const doc = await CreateServer.findOne({ idServer: id });

    if (!doc) {
      console.log('Nenhum servidor encontrado com o id fornecido');
      return res.status(404).json('Nenhum servidor encontrado com o id fornecido');
    }
    doc.online > 0 ? doc.online = doc.online - 1 : 0;

    const updatedDoc = await doc.save();

    console.log('Servidor atualizado com sucesso:', updatedDoc);
  } catch (err) {
    console.error('Erro ao encontrar ou salvar o servidor:', err);
    res.status(500).json('Erro interno do servidor');
  }
});

module.exports = routes;    