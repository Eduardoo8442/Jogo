require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.DATABASE;

const connectDb = async () => {
  try {
    await mongoose.connect(url, {});
    console.log('Servidor conectado à database');
  } catch (err) {
    console.error('Erro ao conectar à database:', err);
  }
};
module.exports = connectDb;
