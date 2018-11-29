const assert = require('assert');
const User = require('../src/user');
const user = require('../data/userRepo');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const craftio = new User({
            username: 'TestUser',
            password: 'Diam0nd',
            threads: [],
            comments: []
        });

        craftio.save()
            .then(() => {
                assert(!craftio.isNew);
                done();
            });
    });

    it('can\'t create multiple users with the same username', (done) => {
        chai.request(server)
            .post('/users')
            .send({ username: 'TestUser', password: 'TestPassword' })
            .end((err, res) => {
                res.should.have.status(201);
            });
        chai.request(server)
            .post('/users')
            .send({ username: 'TestUser', password: 'Different' })
            .end((err, res) => {
                res.should.have.status(409);
            });
    });
});