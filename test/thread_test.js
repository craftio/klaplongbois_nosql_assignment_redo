// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();


// CONFIGURATIONS
const Thread = require('../src/thread');
const threadRepo = require('../data/threadRepo');

let threadID;

//TESTS
describe('Creating records', () => {
    it('Should return a 201 when creating a thread', (done) => {
        chai.request(server)
            .post('/api/threads')
            .send({"title": "testThread", "content": "testcontent", "username": "testUser"})
            .end((err, res) => {
                res.should.have.status(201);
                threadID = res.id;
                done();
            })
    });
    console.log("TEST TEST: " + threadID);

    it('Should return a 400 when at least one required field is missing', (done) => {
        chai.request(server)
            .post('/api/threads')
            .send({"title": null, "content": "testcontent", "username": "testUser"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
});

describe('Reading records', () => {
    it('Should return a 200 on a GET request to /api/threads', (done) => {
        chai.request(server)
            .get('/api/threads')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    // it('Should return a 200 on a GET request to /api/threads/threadID', (done) => {
    //     chai.request(server)
    //         .get('/api/threads/')
    //         .end((err, res) => {
    //             res.should.have.status(200)
    //             done();
    //         })
    // })
});

describe('Updating records', () => {
    it('Should return a 200 on a PUT request to /api/threads', (done) => {
        chai.request(server)
            .put('/api/threads/' + threadID)
            .send({"threadId": threadID, "newContent": "New test content"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('Should return a 400 when at least one of the required fields is missing in the request', (done) => {
        chai.request(server)
            .put('/api/threads/' + threadID)
            .send({"threadId": threadID, "newContent": null})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});

describe('Deleting records', () => {
    it('Should return a 200 on successfully deleting a thread', (done) => {
        chai.request(server)
            .delete('/api/threads/' + threadID)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('Should return a 400 when one of the required fields is missing in the request', (done) => {
        chai.request(server)
            .delete('/api/threads/' + threadID)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
});