/**
 EXCLUDE ABOVE

// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();

// CONFIGURATIONS


// TESTS
describe('A new test module', () => {
    it('A new test', (done) => {
        chai.request(server)
            .post('')
            .send()
            .end((err, res) => {
                // ASSERTION HERE
            });
    });
});

 EXCLUDE BELOW
 */