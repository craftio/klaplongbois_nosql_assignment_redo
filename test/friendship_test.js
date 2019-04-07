// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();

describe('Creating friendships', () => {
    it('Should return a 200 on creating a friendship', (done) => {
        chai.request(server)
            .post('/api/friendships')
            .send({"name": "test1", "friendname": "test2"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
                done();
            })
    });

    it('Should return a 422 when username does not exist', (done) => {
        chai.request(server)
            .post('/api/friendships')
            .send({"name": "doesnotexist", "friendname": "test2"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(422);
                done();
            })
    });

    it('Should return a 422 when friendname does not exist', (done) => {
        chai.request(server)
            .post('/api/friendships')
            .send({"name": "test5", "friendname": "doesnotexist"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(422);
                done();
            })
    })
});

describe('Reading friendships', () => {
    it('Should return a 200 on a GET request to /api/friendships', (done) => {
        chai.request(server)
            .get('/api/friendships')
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
                done();
            })
    });

    it('Should return a 200 on a GET request to /api/friendships/1', (done) => {
        chai.request(server)
            .get('/api/friendships')
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
                done();
            })
    })
});