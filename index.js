let express = require('express');
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });

http.listen(9090, () => console.log('listening on port ' + 9090));