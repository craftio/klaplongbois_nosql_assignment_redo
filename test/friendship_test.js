// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index_test');
const driver = require('../connections/neo4jdriver');

chai.use(chaiHttp);
chai.should();

// CONFIGURATIONS


// TESTS
describe('Friendship test(s)', () => {
    it('can create a friendship', (done) => {
        // SET THIS TO USE ENDPOINTS
        const person1 = 'Björn';
        const person2 = 'Sam';
        const session = driver.session();
        session.close();
        done();
    });
});