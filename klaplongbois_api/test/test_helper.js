/**
 * Dit is de test helper, naar voorbeeld van The Complete Developers Guide To MongoDB
 *
 * Voor de tests wordt een aparte database aangemaakt in de cloud van Atlas met de naam "test"
 * Hierop kunnen we automatisch tests laten uitvoeren en het geheel resetten zonder te klooien in de algemene database.
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DATABASE_NAME = 'test';
const CONNECTION_STRING = 'mongodb+srv://Delete:88mpk@btaks-avans-1-20iox.mongodb.net/' + DATABASE_NAME + '?retryWrites=true';

before((done) => {
    mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => {
            console.log('Good to go!');
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users, threads, comments } = mongoose.connection.collections;
    users.drop(() => {
        threads.drop(() => {
            comments.drop(() => {
                done();
            });
        });
    });
});