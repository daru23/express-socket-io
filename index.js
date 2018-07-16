const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let config = require('./config.json');
let httpsOptions = {
    key: fs.readFileSync('./localhost.key', 'utf8'),
    cert: fs.readFileSync('./localhost.crt', 'utf8'),
};

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

function onConnection(socket) {
    socket.on('drawing', (data) => {
        console.log(data);
        return socket.broadcast.emit('drawing', data);
    });
}

io.on('connection', onConnection);

https.createServer(httpsOptions, app).listen(config.port, () => console.log('listening on port ' + config.port));
