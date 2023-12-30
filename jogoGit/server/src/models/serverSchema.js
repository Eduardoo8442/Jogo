const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servidorSchema = new Schema({
  nome: String,
  nomeServer: String,
  idServer: Number,
  online: Number,
});

const CreateServer = mongoose.model('Servidores', servidorSchema);
module.exports = CreateServer;