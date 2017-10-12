var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Working');
});

var port = process.env.PORT || 3124;
app.listen(port, () => {
    console.log(`Server started at - http://localhost:${port}`);
});
