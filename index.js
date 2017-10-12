var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('diskdb');
db = db.connect('./DB', ['chats']);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/archives', function(req, res) {
    db.loadCollections(['chats']);
    var older = db.chats.find();
    res.send({ data: purge(older) });
});

io.on('connection', function(socket) {
    console.log('Connected');

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        msg.timestamp = dater();
        db.loadCollections(['chats']);
        var older = db.chats.save(msg);
        io.emit('chat message', msg);
    });

    socket.on('typing', function(m) {
        io.emit('typing', m);
    });

    socket.on('connect', function(m) {
        io.emit('connect', m);
    });
});

var port = process.env.PORT || 1232;
http.listen(port, function() {
    console.log(`Server started at - http://localhost:${port}`);
});

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
};

function dater() {
    var date = new Date().addHours(2);
    var str = timer(date.getHours()) + ':' + timer(date.getMinutes());
    return str;
}

function timer(str) {
    return ('0' + str).slice(-2);
}

function purge(array) {
    var worker = array.reverse();
    worker = worker.slice(0, 20);
    return worker.reverse();
}
