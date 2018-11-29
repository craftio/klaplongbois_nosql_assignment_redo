const mongoose = require('mongoose');

//const MongoClient = require('mongodb').MongoClient;

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
const DATABASE_NAME = 'klaplongbois_studdit';
const CONNECTION_STRING = 'mongodb+srv://Delete:88mpk@btaks-avans-1-20iox.mongodb.net/' + DATABASE_NAME + '?retryWrites=true';

mongoose.connect(CONNECTION_STRING,
    {useNewUrlParser: true});

/**
 * SEEMS TO BE WORKING INCORRECTLY
 *
if(process.env.NODE_ENV === 'develop') {
    console.log('debug1');
    mongoose.connect(CONNECTION_STRING,
        {useNewUrlParser: true});
    console.log('debug2');
    console.log(process.env.NODE_ENV.toString());

} else if(process.env.NODE_ENV !== 'develop') {
    mongoose.connect('mongodb://localhost/users',
        {useNewUrlParser: true});
}
 */


/**
// let db =
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true}, (err, client) =>{
    if (err) throw err;
    const collection = client.db("klaplongbois_studdit").collection("users").findOne({name: "John Doe"});
    console.log(collection.toString());
});
 */

let express = require('express');
let server = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

server.use(bodyParser.json());

server.get("/", (req, res, next) => {
    res.send("Welcome to the klaplongbois api");
});

server.get("/", (req, res, next) => {
    res.send("Welcome to the klaplongbois api");
});

// Load the user routes
server.use('/api', require('./routes/v1/routes_users_v1'));
// Load the friendship routes
server.use('/api', require('./routes/v1/routes_friendships_v1'));
// Load the thread routes
server.use('/api', require('./routes/v1/routes_threads_v1'));
// Load the comment routes
server.use('/api', require('./routes/v1/routes_comments_v1'));

server.listen(port, () => {
    console.log("Server is listening on port " + port);
});

module.exports = server;