let express = require('express');
let server = express();
const port = process.env.PORT || 3000;

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