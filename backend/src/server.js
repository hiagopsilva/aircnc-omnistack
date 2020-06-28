const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes.js');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-gc3od.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

// GET, POST, PUT, DELETE

// req.query = acessar query params (para filtros).
// req.params = acessar route params (para edição, delete).
// req.body = acessar corpo da requisição (para criação, edição).

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);