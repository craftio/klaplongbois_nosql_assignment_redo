let express = require('express');
let server  = express.Router();

server.get("/", (req, res) => {
    res.status(200);
    res.send("test user routes v1");
});

// Get all users
server.get("/user", (req, res) => {
    res.contentType('application/json');

    console.log("GET /api/user");
    res.json({
        'statuscode': 200,
        'message': 'get all users'
    })
});

// Get a specific user by ID
server.get("/user/:userId", (req, res) => {
    res.contentType('application/json');
    let id = req.param("userId");

    console.log("GET /api/user/:id");
    res.json({
        'statuscode': 200,
        'message': 'get specific user'
    })
});

// Create a user
server.post("/user/:userId", (req, res) => {
    res.contentType('application/json');
    let id = req.param("userId");

    console.log("POST /api/user/:userId");
    res.json({
        'url': "POST /api/user/:userId",
        'statuscode': 200,
        'message': 'create user'
    })
});

// Update specific user
server.put("/user/:userId", (req, res) => {
    res.contentType('application/json');
    let id = req.param("userId");

    console.log("PUT /api/user/:userId");
    res.json({
        'statuscode': 200,
        'message': 'update a specific user'
    })
});

// Delete specific user
server.delete("/user/:userId", (req, res) => {
    res.contentType('application/json');

    let id = req.param("userId");
    console.log("DELETE /api/user/:userId");

});

module.exports = (server);