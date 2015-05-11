var router = require('express').Router();
var jwt = require('jwt-simple');
var secrets = require('../secrets');

var Item = require('../models/item');

router.get('/', function (req, res, next) {
    var token = req.header('x-auth');
    if (!token) return res.status(401).send('No token supplied');
    var tokenPayload = jwt.decode(token, secrets.jwt);

    Item.find(function (err, items, next) {
        if (err) return next(err);
        return res.json(items);
    });
});

module.exports = router;
