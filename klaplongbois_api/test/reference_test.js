const assert = require('assert');
const User = require('../models/user');
const Thread = require('../models/thread');
const Comment = require('../models/comment');

describe('References', () => {
    let creator, testThread;

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

        creator.threads.push(testThread);

        Promise.all([creator.save(), testThread.save(), testComment.save()])
            .then(() => done());
    });

    it('An existing user can have threads', (done) => {
        User.findOne({ username: 'TheCreator' })
            .populate('threads')
            .then((user) => {
                assert(user.threads[0].title === 'Awesome Title');
                done();
            });
    });
});