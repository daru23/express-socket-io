const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let config = './config.json';

app.get('/', function (req, res) {
    res.send('Hello World!');
});

function onConnection(socket){
    socket.on('drawing', (data) => {
        console.log(data);
        return socket.broadcast.emit('drawing', data)
    });
}

io.on('connection', onConnection);


http.listen(config.port, () => console.log('listening on port ' + config.port));