const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// Inicializar proyecto
const app = express();
let server = http.createServer(app);

//Configuracion
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(publicPath));

//Iniciando socket.io - comunicación del backend
let io = socketIO(server);

io.on('connect', (client) => {
    
    console.log('Usuario conectado');

    client.on('disconnect', ()=> {
        console.log('Usuario desconectado');
    });

    client.on('enviarMensaje', (mensaje) => {
        console.log(mensaje);

        client.broadcast.emit('enviarMensaje', mensaje);
    });

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido al sistema'
    });
});


server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en el puerto ' + port);
});