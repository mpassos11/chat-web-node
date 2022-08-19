const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (obj) {
        io.emit('chat message', obj);
    });
});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});