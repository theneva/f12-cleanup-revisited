var router = require('express').Router();

var Item = require('../models/item');

router.get('/', function (req, res) {
    Item.find(function (err, items, next) {
        if (err) return next(err);
        return res.json(items);
    });
});

module.exports = router;
