const mongoose = require('mongoose');
const DATABASE_NAME = 'klaplongbois_studdit';
const CONNECTION_STRING = 'mongodb+srv://Delete:88mpk@btaks-avans-1-20iox.mongodb.net/' + DATABASE_NAME + '?retryWrites=true';

mongoose.Promise = global.Promise;

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB main is started!")
    })
    .catch(err => console.log(err));

mongoose.connection
    .once('open', () => {
        console.log('MongoDB main is listening!');
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });

module.exports = mongoose;

/**
 * EXAMPLE CODE FROM https://docs.atlas.mongodb.com/driver-connection/#node-js-driver-example
 *
 var MongoClient = require('mongodb').MongoClient;

 var uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test";
 MongoClient.connect(uri, function(err, client) {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
 */