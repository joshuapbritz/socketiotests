var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
});

var port = process.env.PORT || 3124;
http.listen(port, function() {
    console.log(`Server started at - http://localhost:${port}`);
});
