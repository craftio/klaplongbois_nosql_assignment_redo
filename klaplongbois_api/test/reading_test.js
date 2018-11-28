const assert = require('assert');
const User = require('../models/user');
const Thread = require('../models/thread');
const Comment = require('../models/comment');

describe('Reading records', () => {
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

        testThread.comments.push(testComment);

        testComment.comments.push(testReply);
        testReply.comments.push(testReplyToReply);

        Promise.all([creator.save(), testThread.save(), testComment.save(), testReply.save(), testReplyToReply.save()])
            .then(() => done());
    });

    it('Can find deeply nested reply', (done) => {
        Thread.findOne({ title: 'Awesome Title' })
            .populate({
                path: 'comments',
                populate: {
                    path: 'comments',
                    model: 'comment'
                }
            })
            .then((thread) => {
                assert(thread.title === 'Awesome Title');
                assert(thread.comments[0].content === 'Hello Thread');
                assert(thread.comments[0].comments[0].content === 'Hello Thread Comment');
                assert(thread.comments[0].comments[0].comments[0].content === 'Hello Thread Comment Reply');
                done();
            });
    });
});