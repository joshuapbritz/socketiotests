var db = require('diskdb');
db = db.connect('./DB', ['chats', 'chatBKP']);
var fs = require('fs');
var _ = require('./utils');

exports.bkp = function(time) {
    console.log('Backup initialized');
    setInterval(function() {
        db.loadCollections(['chats']);
        var chats = db.chats.find();
        var dataObject = {
            data: chats,
            stamp: new Date().toDateString() + ` [${_.dater()}]`,
        };
        fs.writeFile(
            './DB/chatBKP.json',
            JSON.stringify(dataObject),
            function() {
                console.log('Saved ' + dataObject.stamp);
            }
        );
    }, time);
};
