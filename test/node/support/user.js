var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var secrets = require('../../../server/secrets');
var User = require('../../../server/models/user');

module.exports.create = function(username, password, callback) {
    var passwordHash = bcrypt.hashSync(password, 10);

    var user = new User({
        username: username,
        passwordHash: passwordHash
    });

    user.save(function(err) {
        if (err) throw err;
        user.token = jwt.encode({username: user.username}, secrets.jwt);
        callback(null, user); // err, user
    });
};

module.exports.remove = function(criteria, done) {
    User.remove(criteria, done);
};
