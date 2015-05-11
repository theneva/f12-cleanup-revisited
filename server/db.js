var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/itemsfortesting', function (err) {
    if (err) throw err;
    console.log('Connected to MongoDB', 'itemsfortesting');
});

module.exports = mongoose;
