var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/api', bodyParser.json());
app.use('/api/items', require('./controllers/items'));

var port = 3422;
app.listen(port, function() {
    console.log('app listening on port', port);
});
