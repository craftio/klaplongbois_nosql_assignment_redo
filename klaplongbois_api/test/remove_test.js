const assert = require('assert');
const User = require('../src/user');
const Thread = require('../src/thread');
const Comment = require('../src/comment');

describe('Removal of records', () => {
    let creator, testThread, testComment, testReply, testReplyToReply;

    beforeEach((done) => {
        creator = new User({
            username: 'TheCreator',
            password: 'AssertMe',
            threads: []
        });

        testThread = new Thread({
            title: 'Awesome Title',
            content: 'Awesome content',
            upvotes: [],
            downvotes: []
        });

        testComment = new Comment({
            postedBy: creator,
            onThread: testThread,
            content: 'Hello Thread',
            upvotes: [],
            downvotes: [],
            comments: []
        });

        creator.threads.push(testThread);

        Promise.all([creator.save(), testThread.save(), testComment.save()])
            .then(() => done());
    });
});