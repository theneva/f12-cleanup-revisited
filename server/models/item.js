var db = require('../db');

var Item = db.model('Item', {
    name: String,
    owner: String
});

module.exports = Item;
