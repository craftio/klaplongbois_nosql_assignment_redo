const assert = require('assert');
const User = require('../../src/user');
const Thread = require('../../src/thread');
const Comment = require('../../src/comment');

xdescribe('Removal of records', () => {
    let creator, testThread, testComment, testReply, testReplyToReply;

    beforeEach((done) => {
        creator = new User({
            username: 'TheCreator',
            password: 'AssertMe',
            threads: [],
            comments: []
        });

        testThread = new Thread({
            title: 'Awesome Title',
            content: 'Awesome content',
            upvotes: [],
            downvotes: [],
            comments: []
        });

        testComment = new Comment({
            content: 'Hello Thread',
            upvotes: [],
            downvotes: [],
            comments: []
        });

        testReply = new Comment({
            content: 'Hello Thread Comment',
            upvotes: [],
            downvotes: [],
            comments: []
        });

        testReplyToReply = new Comment({
            content: 'Hello Thread Comment Reply',
            upvotes: [],
            downvotes: [],
            comments: []
        });

        creator.threads.push(testThread);
        creator.comments.push(testComment);
        creator.comments.push(testReply);
        creator.comments.push(testReplyToReply);

        testThread.comments.push(testComment);

        testComment.comments.push(testReply);
        testReply.comments.push(testReplyToReply);

        Promise.all([creator.save(), testThread.save(), testComment.save()])
            .then(() => done());
    });

    it('Can remove a comment', (done) => {
        Comment.findOneAndDelete({ content: 'Hello Thread' })
            .then(() => Comment.findOne({ content: 'Hello Thread' }))
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });

    it('Will not delete overlaying comments', (done) => {
        Comment.findOneAndDelete({ content: 'Hello Thread Comment' })
            .then(() => Comment.findOne({ content: 'Hello Thread' }))
            .then((overlayingComment) => {
                assert(overlayingComment.content === 'Hello Thread');
            })
            .then(() => Comment.findOne({ content: 'Hello Thread Comment' }))
            .then((deletedComment) => {
                assert(deletedComment === null);
            })
            .then(() => Comment.findOne({ content: 'Hello Thread Comment Reply' }))
            .then((underlyingComment) => {
                assert(underlyingComment === null);
                done();
            });
    });

    it('Can remove a user without removing threads', (done) => {
        User.findOneAndDelete({ username: 'TheCreator' })
            .then(() => Thread.findOne({ title: 'Awesome Title' }))
            .then((thread) => {
                assert(thread !== null);
                done();
            });
    });

    it('When a thread is removed, all the underlying comments get removed.', (done) => {
        Thread.findOneAndDelete({ title: 'Awesome Title' })
            .then(() => Comment.findOne({ content: 'Hello Thread Comment Reply' }))
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });

    it('Can remove everything', (done) => {
        User.findOneAndDelete({ username: 'TheCreator' })
            .then(() => User.findOne({ username: 'AssertMe' }))
            .then((user) => {
                assert(user === null);
            })
            .then(() => Thread.findOneAndDelete({ title: 'Awesome Title' }))
            .then(() => Thread.findOne({ title: 'Awesome Title' }))
            .then((thread) => {
                assert(thread === null);
            })
            .then(() => Comment.findOne({ content: 'Hello Thread Comment Reply' }))     // NOTE: We check for a deeply nested comment here without deleting it beforehand.
            .then((comment) => {
                assert(comment === null);
                done();
            });
    });
});