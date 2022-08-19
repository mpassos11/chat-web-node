const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('Usuário conectado');

    socket.on('disconnect', function () {
        console.log('Usuário deconectado');
    });
})

http.listen(3000, function() {
    console.log('Listening on port 3000');
});