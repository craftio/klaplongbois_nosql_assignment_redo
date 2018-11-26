let express = require('express');
let server  = express();

server.get("/", (req, res) => {
    res.status(200);
    res.send("test user routes v1");
});

// Get all users
server.get("/user", (req, res) => {
    console.log("GET /api/user")
    res.json({
        'statuscode': 200,
        'message': 'all users'
    })
});

module.exports = (server);