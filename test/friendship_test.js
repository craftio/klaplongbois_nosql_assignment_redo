// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();
