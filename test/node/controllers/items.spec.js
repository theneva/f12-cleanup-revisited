var expect = require('chai').expect;

var request = require('supertest');
var app = require('express')();

var controller = require('../../../server/controllers/items');
app.use('/api/items', controller);

describe('controllers.items', function () {
    it('should exist', function () {
        expect(controller).to.exist;
    });

    describe('GET /api/items', function () {
        it('responds with proper json', function (done) {
            request(app)
                .get('/api/items')
                .expect('Content-Type', /json/)
                .expect([
                    {name: 'Urge Intense', owner: 'Theneva'},
                    {name: 'Ananasbrus', owner: 'Theneva'},
                    {name: 'ngResource', owner: 'theknarf'}
                ], done);
        });
    });
});
