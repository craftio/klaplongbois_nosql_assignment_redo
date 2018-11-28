const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
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
});