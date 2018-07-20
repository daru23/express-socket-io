const express = require('express');
let path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let config = require('./config.json');

app.use('/',express.static(path.join(__dirname, 'static')));

let numUsers = 0;

function onConnection(socket) {
    let addedUser = false;
    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
    socket.on('drawing', (data) => {
        return socket.broadcast.emit('drawing', data);
    });

}

io.on('connection', onConnection);

http.listen(config.port, () => console.log('listening on port ' + config.port));