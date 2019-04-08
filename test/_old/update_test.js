const assert = require('assert');
const User = require('../../src/user');
const Thread = require('../../src/thread');
const Comment = require('../../src/comment');

xdescribe('Updating records', () => {
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

    it('Can upvote a comment', (done) => {
        Thread.findOne({ title: 'Awesome Title' })
            .then((thread) => {
                thread.upvotes.push(creator);
                assert(thread.upvotes.length === 1);
                done();
            });
    });
});