let express = require('express');
let server = express();
const port = process.env.PORT || 3000;

server.get("/", (req, res, next) => {
    res.send("Welcome to the klaplongbois api");
});

// Load the user routes
server.use('/api', require('./routes/v1/routes_user_v1'));
// Load the friendship routes
server.use('/api', require('./routes/v1/routes_friendship_v1'));
// Load the thread routes
server.use('/api', require('./routes/v1/routes_thread_v1'));
// Load the comment routes
server.use('/api', require('./routes/v1/routes_comment_v1'));

server.listen(port, () => {
    console.log("Server is listening on port " + port);
});

module.exports = server;