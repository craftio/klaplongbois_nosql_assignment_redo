// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index_test');

chai.use(chaiHttp);
chai.should();

// CONFIGURATIONS
const User = require('../src/user');
const user = require('../data/userRepo');

// TESTS
xdescribe('Creating records', () => {
    it('saves a user in the database', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({ username: 'testUser', password: 'test1234'})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(201);
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