var router = require('express').Router();

var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        return res.json(users);
    });
});

module.exports = router;
