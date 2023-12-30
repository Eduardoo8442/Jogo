require('dotenv').config();
function connectSocket(server) {
const io = require('socket.io')(server, {
    cors: {
        origin: `${process.env.URLFRONT}`
    }
});
return io;
}
module.exports = connectSocket;