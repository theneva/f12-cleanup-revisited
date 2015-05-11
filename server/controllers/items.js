var router = require('express').Router();

router.get('/', function(req, res) {
    return res.json([
        {name: 'Urge Intense', owner: 'Theneva'},
        {name: 'Ananasbrus', owner: 'Theneva'},
        {name: 'ngResource', owner: 'theknarf'}
    ]);
});

module.exports = router;
