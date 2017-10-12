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
        var b = document.createElement('B');
        b.textContent = msg.user + ': ';
        li.appendChild(b);
        var span = document.createElement('SPAN');
        span.textContent = msg.message;
        li.appendChild(span);
        var time = document.createElement('SPAN');
        time.textContent = msg.timestamp;
        time.classList.add('time');
        li.appendChild(time);
        li.id = Date.now();
        li.addEventListener('dblclick', function() {
            console.log(this.id);
        });
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
            var messages = document.getElementById('messages');

            var res = JSON.parse(this.responseText).data;

            res.forEach(el => {
                var li = document.createElement('LI');
                var b = document.createElement('B');
                b.textContent = el.user + ': ';
                li.appendChild(b);
                var span = document.createElement('SPAN');
                span.textContent = el.message;
                li.appendChild(span);
                var time = document.createElement('SPAN');
                time.textContent = el.timestamp;
                time.classList.add('time');
                li.appendChild(time);
                li.id = Date.now();
                li.addEventListener('dblclick', function() {
                    console.log(this.id);
                });
                messages.appendChild(li);
            });
        }
    };
    xhttp.open('POST', '/archives', true);
    xhttp.send();
}
