// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();

describe('Reading comments', () => {

    it('Should return a 200 on GET request to /api/comments', (done) => {
        chai.request(server)
            .get('/api/comments')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('Should return a 200 GET request to /api/comments/:commentID', (done) => {
        chai.request(server)
            .get('/api/comments/:commentID')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});

describe('Creating comments', () => {

    it('Should return a 201 on succesfully creating a comment', (done) => {
        chai.request(server)
            .post('/api/comments/:threadID')
            .send({"postedBy": "testUser", "onThread":"12313", "content": "testcontent"})
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });

    it('Should return a 400 if on of the required comment fields is missing', (done) => {
        chai.request(server)
            .post('/api/comments/:threadID')
            .send({"postedBy": "testUser", "onThread": null, "content": "testcontent"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    });
});

describe('Updating comments', () => {

    it('Should return on a 200 on succesfully updating a comment', (done) => {
        chai.request(server)
            .post('/api/comments/:commentID')
            .send({"postedBy": "testUser", "onThread": null, "content": "testcontent"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
});

describe('Deleting comments', () => {
    it('Should return a 200 on successfully deleting a comment', (done) => {
        chai.request(server)
            .post('/api/comments/threadId/commentID')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('Should return a 400 when one of the required fields is missing', (done) => {
        chai.request(server)
            .post('/api/comments/threadId/commentId')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
});