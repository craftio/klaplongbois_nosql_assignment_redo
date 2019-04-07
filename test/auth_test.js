// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();

// CONFIGURATIONS
const User = require('../src/user');
const user = require('../data/userRepo');

// TESTS
describe('Creating records', () => {
    it('should return a 201 when saving a user in the database', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ "username": "testUser", "password": "test1234"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(201);
                done();
            })
    });

    it('can\'t create multiple users with the same username', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ username: 'TestUser', password: 'TestPassword' })
            .end((err, res) => {
                res.body.statuscode.should.be.equal(201);
                chai.request(server)
                    .post('/api/users')
                    .send({ username: 'TestUser', password: 'Different' })
                    .end((err, res) => {
                        res.body.statuscode.should.be.equal(409);
                        done();
                    });
            });
    });
});

describe('Changing user records', () => {

    it('should return a 400 when missing username on changing user password', (done) => {
        chai.request(server)
            .put('/api/users')
            .send({ "username": null, "password": "test1234", "newPassword": "test1234"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    });

    it('should return a 400 when missing password on changing user password', (done) => {
        chai.request(server)
            .put('/api/users')
            .send({ "username": "testUser", "password": null, "newPassword": "test1234"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    });

    it('should return a 400 when missing new password on changing user password', (done) => {
        chai.request(server)
            .put('/api/users')
            .send({ "username": "testUser", "password": "testpassword", "newPassword": null})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    });

    it('should return a 400 when the supplied username does not exist', (done) => {
        chai.request(server)
            .put('/api/users')
            .send({ "username": "usernamedoesnotexist", "password": "test1234", "newPassword": "test1234"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    });

    it('should return a 400 when a user is not logged in', (done) => {
        chai.request(server)
            .put('/api/users')
            .send({ "username": "testUser", "password": "test12123qwe34", "newPassword": "test12342"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })

    })
});

describe('Deleting user records', () => {

    it('Should return a 422 when the user does not exist', (done) => {
        chai.request(server)
            .delete('/api/users')
            .send({"username": "userthatdoesnotexist", "password": "testpassword"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(422);
                done();
            })
    });
});