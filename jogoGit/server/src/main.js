require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const connectDb = require('./config/mongodb');
const connectSocket = require('./config/sockets');
const routes = require('./routes');
const cors = require('cors');
const axios = require('axios');
const io = connectSocket(server);
const mongoose = require('mongoose');
 const CreateServer = require('./models/serverSchema');
connectDb();
const corsOptions = {
  origin: process.env.URLFRONT,
};
app.use(cors(corsOptions));
io.on('connection', socket => {
    console.log(`Usuário ${socket.id} conectou.`);   
    socket.on('disconnect', (text) => {
        console.log(socket.id, 'desconectou');
        const dados = socket.data.usuario;
        if(dados) {
        const id = dados.idServer || 0;
        if(dados.host === false) {
          io.emit('clearList', { id: socket.data.usuario.idServer});
          axios.post(`${process.env.URL}/saida`, { id: dados.idServer})
           .then(response => {
            console.log(response.data);
              })
            .catch(error => {
            console.log(error)
           }); 
        }
        if(dados.host === true) {
            CreateServer.findOneAndDelete({ idServer: dados.idServer })
           .then((date) => {
                   if (date) {
             console.log('Servidor excluido', date);
                 } else {
               console.log('Id servidor nao encontrado', dados.idServer);
             }
        })
   .catch((erro) => {
    console.error('Erro ao excluir documento:', erro);
  });

        }
        }
    })
    socket.on('mensagem', ({ mensagem=null, nick='desconhecido', id=0}) => {
    io.emit('receive', {
     text: mensagem,
     name: nick,
     id: id,
    });
  });
    socket.on('initParty', ({ jogador, id }) => {
    io.emit('partyPlayers', {jogador: jogador, id: id});
    });
    socket.on('read', ({ theme, response, id }) => {
    io.emit('comecar', { theme: theme, response: response, id: id});
    });
    socket.on('response', ({ id, response, nick}) => {
      io.emit('sendResponse', { id: id, response: response, nome: nick});
    })
    socket.on('dica', ({ id, response}) => {
    io.emit('sendDica', { id: id, response: response });
    });
    socket.on('entrada', ({ dados }) => {
      socket.data.usuario = dados;
    io.emit('clearList', { id: dados.idServer});
    });
    socket.on('cleared', ({ nome, id, host }) => {
    io.emit('updatePlayers', { id: id, nome: nome, host: host });
    });
    socket.on('CreateServer', ({name, serverName, idServer, usuario, online}) => {
        const novoServidor = new CreateServer({
            nome: name,
            nomeServer: serverName,
            idServer: idServer,
            online: 1,
          });
        socket.data.usuario = usuario;
          novoServidor.save()
          .then((resultado) => {
         console.log('Servidor salvo com sucesso:', resultado);
            })
                .catch((erro) => {
             console.error('Erro ao salvar servidor:', erro);
        });
            })
});
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('Servidor rodando na porta', port);
});