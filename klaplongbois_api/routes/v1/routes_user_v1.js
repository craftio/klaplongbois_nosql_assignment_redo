let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');

server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

// Get all users
server.get("/user", (req, res) => {
    res.json(new jsonModel("/api/user", "GET", 200, "get all users"));
});

// Get a specific user by ID
server.get("/user/:userId", (req, res) => {
    let id = req.param("userId");

    res.json(new jsonModel("/api/user/:id", "GET", 200, "get a specific user"));
});

// Create a user
server.post("/user/:userId", (req, res) => {
    let id = req.param("userId");

    res.json(new jsonModel("/api/user/:userId", "POST", 200, "create a user"));
});

// Update specific user
server.put("/user/:userId", (req, res) => {
    let id = req.param("userId");

    res.json(new jsonModel("/api/user/:userId", "PUT", 200, "update a specific user"));
});

// Delete specific user
server.delete("/user/:userId", (req, res) => {
    let id = req.params.userId;

    res.json(new jsonModel("/api/user/:userId", "DELETE", 401, "delete a specific user"));
});

module.exports = (server);