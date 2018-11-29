const assert = require('assert');
const User = require('../models/user');

xdescribe('Creating records', () => {
    it('saves a user', (done) => {
        const craftio = new User({
            username: 'craftio',
            password: 'Diam0nd',
            threads: [],
            comments: []
        });

        craftio.save()
            .then(() => {
                assert(!craftio.isNew);
                done();
            });
    });

    it('can\'t create multiple users with the same username', (done) => {
        const craftio = new User({
            username: 'craftio',
            password: 'Diam0nd',
            threads: [],
            comments: []
        });

        const duplicate = new User({
            username: 'craftio',
            password: 'NotDiam0nd',
            threads: [],
            comments: []
        });

        craftio.save();
        duplicate.save()
            .then(() => User.find({ username: 'craftio' }))
            .then((users) => {
                assert(users.length === 2);
                done();
            });
    });
});