const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var usuarios = [];
var socketIds = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('new user', function (data) {
        if (usuarios.indexOf(data) != -1) {
            socket.emit('new user', { success: false });
        } else {
            usuarios.push(data);
            socketIds.push(socket.id);
            socket.emit('new user', { success: true });
        }
    });
    
    socket.on('chat message', function (obj) {
        if (usuarios.indexOf(obj.nome) != -1 && usuarios.indexOf(obj.nome) == socketIds.indexOf(socket.id)) {
            io.emit('chat message', obj);
        } else {
            console.log('Error: Você não tem permissão para executar essa ação');
        }
    });

    socket.on('disconnect', function () {
        let id = socketIds.indexOf(socket.id);
        socketIds.splice(id, 1);
        usuarios.splice(id, 1);
        console.log('user disconnected');
    })
});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});