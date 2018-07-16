const express = require('express');
let path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let config = require('./config.json');

app.use('/',express.static(path.join(__dirname, 'static')));

function onConnection(socket) {
    socket.on('drawing', (data) => {
        console.log(data);
        return socket.broadcast.emit('drawing', data);
    });
}

io.on('connection', onConnection);

http.listen(config.port, () => console.log('listening on port ' + config.port));