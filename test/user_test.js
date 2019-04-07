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
describe('User model test(s)', () => {
    it('can create a user', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ username: 'UserTest1', password: 'UserTest1Pass' })
            .end((err, res) => {
                // ASSERTION HERE
                res.body.statuscode.should.be.equal(201);
                res.body.statuscode.should.not.be.equal(409);
                res.body.statuscode.should.not.be.equal(500);
                done();
            });
    });

    it('can\'t create multiple users with the same username', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ username: 'UserTest2', password: 'UserTest2Pass' })
            .end((err, res) => {
                res.body.statuscode.should.be.equal(201);
                chai.request(server)
                    .post('/api/users')
                    .send({ username: 'UserTest2', password: 'UserTest2DiffPass' })
                    .end((err, res) => {
                        res.body.statuscode.should.be.equal(409);
                        done();
                    });
            });
    });
});