const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let config = require('./config.json');
let httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
};

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


https.createServer(httpsOptions, app).listen(config.port, () => console.log('listening on port ' + config.port));
