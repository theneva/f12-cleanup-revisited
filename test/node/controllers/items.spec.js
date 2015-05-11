var expect = require('chai').expect;

var request = require('supertest');
var app = require('express')();

var controller = require('../../../server/controllers/items');
app.use('/api/items', controller);

var Item = require('../../../server/models/item');

describe('controllers.items', function () {
    it('should exist', function () {
        expect(controller).to.exist;
    });

    describe('GET /api/items', function () {
        var expectedItems = [
            {name: 'Urge Intense', owner: 'Theneva'},
            {name: 'Ananasbrus', owner: 'Theneva'},
            {name: 'ngResource', owner: 'theknarf'}
        ];

        beforeEach(function (done) {
            Item.create(expectedItems, done);
        });

        it('responds with proper json', function (done) {
            request(app)
                .get('/api/items')
                .expect('Content-Type', /json/, done);
        });

        it('has ' + expectedItems.length + ' items', function (done) {
            request(app)
                .get('/api/items')
                .expect(200)
                .expect(function(response) {
                    var items = response.body;
                    expect(items).to.have.length(3);
                })
                .end(done);
        });

        afterEach(function (done) {
            Item.remove({}, done);
        });
    });
});
