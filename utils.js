Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
};

var tm = function(str) {
    return ('0' + str).slice(-2);
};

var dt = function() {
    var date = new Date().addHours(2);
    var str = tm(date.getHours()) + ':' + tm(date.getMinutes());
    return str;
};

exports.dater = dt;

exports.timer = tm;
