let express = require('express');
let server  = express();

server.get("/", (req, res) => {
    res.status(200);
    res.send("test user routes v1");
});

// Get all users
server.get("/user", (req, res) => {
    console.log("GET /api/user");
    res.json({
        'statuscode': 200,
        'message': 'get all users'
    })
});

// Get a specific user by ID
server.get("/user/:id", (req, res) => {
   console.log("GET /api/user/:id");
   res.json({
        'statuscode': 200,
        'message': 'get specific user'
   })
});

// Update specific user
server.put("/user/:id", (req, res) => {
    console.log("PUT /api/user/:id");
    res.json({
        'statuscode': 200,
        'message': 'update a specific user'
    })
});

module.exports = (server);