const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rotas = require('./routes');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

const usuariosConectados = {};

io.on('connection', socket => {
    const {idusuario} = socket.handshake.query;
   usuariosConectados[idusuario] = socket.id;
});

mongoose.connect('mongodb+srv://gabrielcruz:56210160Casa@mongoserver-lbga7.mongodb.net/TinderDev?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.usuariosConectados = usuariosConectados;

    return next();
});

app.use(express.json());
app.use(rotas);

server.listen(process.env.PORT || 3333);
