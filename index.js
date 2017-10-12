var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Connected');
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        msg.timestamp = dater();
        io.emit('chat message', msg);
    });

    socket.on('typing', function(m) {
        io.emit('typing', m);
    });
});

var port = process.env.PORT || 3124;
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
