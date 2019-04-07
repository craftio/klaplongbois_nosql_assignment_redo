// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test_index');

chai.use(chaiHttp);
chai.should();

const Comment = require('../src/comment');
const commentRepo = require('../data/commentRepo');

let threadId;
let commentId;

describe('Creating comments', () => {

    it('Should return a 201 on succesfully creating a comment', (done) => {
        let comment = commentRepo.getSingleComment("testUser");
        threadId = comment.thread;
        chai.request(server)
            .post('/api/comments/' + threadID)
            .send({"postedBy": "testUser", "onThread":"12313", "content": "testcontent"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(201);
                done();
            })
    });

    it('Should return a 400 if on of the required comment fields is missing', (done) => {
        chai.request(server)
            .post('/api/comments/:threadID')
            .send({"postedBy": "testUser", "onThread": null, "content": "testcontent"})
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    });
});

describe('Reading comments', () => {
    // commentRepo.getSingleComment("testUser");

    it('Should return a 200 on GET request to /api/comments', (done) => {
        chai.request(server)
            .get('/api/comments')
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
                done();
            })
    });

    it('Should return a 200 GET request to /api/comments/:commentID', (done) => {
        chai.request(server)
            .get('/api/comments/' + commentId)
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
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
                res.body.statuscode.should.be.equal(200);
                done();
            })
    })
});

describe('Deleting comments', () => {
    it('Should return a 200 on successfully deleting a comment', (done) => {
        chai.request(server)
            .post('/api/comments/1/1')
            .end((err, res) => {
                res.body.statuscode.should.be.equal(200);
                done();
            })
    });

    it('Should return a 400 when one of the required fields is missing', (done) => {
        chai.request(server)
            .post('/api/comments/1/1')
            .end((err, res) => {
                res.body.statuscode.should.be.equal(400);
                done();
            })
    })
});