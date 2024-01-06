const express = require('express');
const routes = express.Router();
const CreateServer = require('./models/serverSchema');
const multerConfig = require('./config/multer');

const handleServerError = (res, error) => {
    console.error('Erro interno do servidor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
};

routes.get('/getlist', async (req, res) => {
    try {
        const documentos = await CreateServer.find({});
        console.log('Documentos encontrados:', documentos);
        return res.status(200).json(documentos);
    } catch (erro) {
        return handleServerError(res, erro);
    }
});

routes.post('/upload', multerConfig.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
    const filePath = req.file.path;
    const imageLink = `${process.env.URL}/uploads/${filePath.replace('uploads/', '')}`;
    return res.status(200).json({ imageLink });
});

routes.post('/entrada', async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'Nenhum id foi enviado.' });
    }

    try {
        const doc = await CreateServer.findOne({ idServer: id });

        if (!doc) {
            console.log('Nenhum servidor encontrado com o id fornecido');
            return res.status(404).json({ error: 'Nenhum servidor encontrado com o id fornecido' });
        }

        doc.online = (doc.online || 0) + 1;

        const updatedDoc = await doc.save();

        console.log('Servidor atualizado com sucesso:', updatedDoc);
        return res.status(200).json({ message: 'Servidor atualizado com sucesso' });
    } catch (err) {
        return handleServerError(res, err);
    }
});

routes.post('/saida', async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'Nenhum id foi enviado.' });
    }

    try {
        const doc = await CreateServer.findOne({ idServer: id });

        if (!doc) {
            console.log('Nenhum servidor encontrado com o id fornecido');
            return res.status(404).json({ error: 'Nenhum servidor encontrado com o id fornecido' });
        }

        doc.online = Math.max(0, doc.online - 1);

        const updatedDoc = await doc.save();

        console.log('Servidor atualizado com sucesso:', updatedDoc);
        return res.status(200).json({ message: 'Servidor atualizado com sucesso' });
    } catch (err) {
        return handleServerError(res, err);
    }
});

module.exports = routes;
