var nickname;
var socket = io();
$(function() {
    nickname = getNickname(function(val) {
        console.log('Connected as ' + val);
    });

    $('form').submit(function() {
        socket.emit('chat message', { user: nickname, message: $('#m').val() });
        $('#m').val('');
        socket.emit('typing', '');
        return false;
    });
    socket.on('chat message', function(msg) {
        var messages = document.getElementById('messages');

        var li = document.createElement('LI');
        var b = document.createElement('DIV');
        b.textContent = msg.user;
        b.className = 'user';
        li.appendChild(b);
        var span = document.createElement('DIV');
        span.textContent = msg.message;
        span.className = 'content';
        li.appendChild(span);
        var time = document.createElement('SPAN');
        time.textContent = msg.timestamp;
        time.classList.add('time');
        li.appendChild(time);
        li.id = Date.now();
        messages.appendChild(li);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var m = document.getElementById('m');
    m.addEventListener('keyup', function() {
        if (m.value !== '') {
            socket.emit('typing', nickname);
        } else {
            socket.emit('typing', '');
        }
    });
    socket.on('typing', function(msg) {
        var typing = document.querySelector('.typing');
        if (msg) {
            if (msg !== nickname) {
                typing.innerHTML = msg + ' is typing';
                typing.style.display = 'inline-flex';
            }
        } else {
            typing.style.display = 'none';
        }
    });
});

function getNickname(cb) {
    var localName = localStorage.getItem('username');
    if (localName) {
        cb(localName);
        onceConnected();
        return localName;
    } else {
        var call = prompt('What is your name?');
        localStorage.setItem('username', call);
        cb(call);
        onceConnected();
        return call;
    }
}

function onceConnected() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            var messages = document.getElementById('messages');

            var res = resp.data;

            if (resp.colors) {
                document.body.style.backgroundColor = resp.colors;
                document.getElementById(
                    'g6d7gd6d7239dg2hj9238hd938hd'
                ).style.backgroundColor =
                    resp.colors;
                document.getElementById('color').value = resp.colors;
            }

            res.forEach(msg => {
                var li = document.createElement('LI');
                var b = document.createElement('DIV');
                b.textContent = msg.user;
                b.className = 'user';
                li.appendChild(b);
                var span = document.createElement('DIV');
                span.textContent = msg.message;
                span.className = 'content';
                li.appendChild(span);
                var time = document.createElement('SPAN');
                time.textContent = msg.timestamp;
                time.classList.add('time');
                li.appendChild(time);
                li.id = Date.now();
                messages.appendChild(li);
            });
        }
    };
    xhttp.open('POST', '/archives', true);
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('color-btn').addEventListener('click', function() {
        var color = document.getElementById('color').value;
        socket.emit('colorchange', color);
    });

    socket.on('colorchange', function(color) {
        document.body.style.backgroundColor = color;
        document.getElementById(
            'g6d7gd6d7239dg2hj9238hd938hd'
        ).style.backgroundColor = color;
    });
});
