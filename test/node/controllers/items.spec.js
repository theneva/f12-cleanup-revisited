var expect = require('chai').expect;

var request = require('supertest');
var app = require('express')();

var router = require('../../../server/controllers');
app.use('/api', router);

var Item = require('../../../server/models/item');
var User = require('../support/user');

describe('controllers.index', function () {
    it('should exist', function () {
        expect(router).to.exist;
    });
});

describe('controllers.items', function () {
    describe('GET /api/items', function () {
        var expectedItems = [
            {name: 'Urge Intense', owner: 'Theneva'},
            {name: 'Ananasbrus', owner: 'Theneva'},
            {name: 'ngResource', owner: 'theknarf'}
        ];

        var user;

        beforeEach(function (done) {
            Item.create(expectedItems, function (err) {
                if (err) throw err;
                User.create('testusername', 'ananas1234', function (err, createdUser) {
                    if (err) throw err;
                    user = createdUser;
                    done();
                });
            });
        });

        it('responds with proper json', function (done) {
            request(app)
                .get('/api/items')
                .set('x-auth', user.token)
                .expect('Content-Type', /json/, done);
        });

        it('has ' + expectedItems.length + ' items', function (done) {
            request(app)
                .get('/api/items')
                .set('x-auth', user.token)
                .expect(200)
                .expect(function (response) {
                    var items = response.body;
                    expect(items).to.have.length(3);
                })
                .end(done);
        });

        afterEach(function (done) {
            Item.remove({}, function (err) {
                if (err) throw err;
                User.remove({}, done);
            });
        });
    });
});
