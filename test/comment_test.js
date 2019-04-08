// REQUIRED LINES FOR ENDPOINT TESTS
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index_test');

chai.use(chaiHttp);
chai.should();

const Thread = require('../src/thread');

let threadId;
let commentId;

describe('Creating comments', () => {

    it('Should return a 201 on succesfully creating a comment', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
                "username": "commentTest1",
                "password": "password"
            })
            .end((err, res) => {
                chai.request(server)
                    .post('/api/threads')
                    .send({
                        "title": "Comment Test 1",
                        "content": "content",
                        "username": "commentTest1"
                    })
                    .end((err, res) => {
                        Thread.find()
                            .then((docs1) => {
                                chai.request(server)
                                    .post('/api/comments/' + docs1[0]._id)
                                    .send({
                                        "username": "commentTest1",
                                        "content": "content"
                                    })
                                    .end((err, res) => {
                                        Thread.find()
                                            .then((docs2) => {
                                                res.should.have.status(201);
                                                assert(docs2[0].comments[0].content === "content");
                                                done();
                                            });
                                    })
                            })
                    })
            });
    });

    it('Should return a 400 if one of the required comment fields is missing', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
                "username": "commentTest2",
                "password": "password"
            })
            .end((err, res) => {
                chai.request(server)
                    .post('/api/threads')
                    .send({
                        "title": "Comment Test 2",
                        "content": "content",
                        "username": "commentTest2"
                    })
                    .end((err, res) => {
                        Thread.find()
                            .then((docs1) => {
                                chai.request(server)
                                    .post('/api/comments/' + docs1[0]._id)
                                    .send({
                                        "username": "commentTest2"
                                    })
                                    .end((err, res) => {
                                        Thread.find()
                                            .then((docs2) => {
                                                res.should.have.status(400);
                                                assert(docs2[0].comments[0] === undefined);
                                                done();
                                            });
                                    });
                            });
                    });
            });
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