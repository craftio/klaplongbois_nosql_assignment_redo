let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let mongoose = require('mongoose');
let user = require('../../src/user');


server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

// Get all users
server.get("/users", (req, res) => {
    try {
    res.json(new jsonModel("/api/user", "GET", 200, "get all users"));
    } catch (error) {
        res.json(error);
    }
});

// Get a specific user by ID
server.get("/users/:userId", (req, res) => {
    let id = req.param("userId");
    try {
    res.json(new jsonModel("/api/user/:id", "GET", 200, "get a specific user"));
    } catch (error) {
        res.json(error);
    }
});

// Create a user
server.post("/users", (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    try {
        user.createUser(name, password, res);
    } catch (error) {
        res.json(error);
    }
});

// Update specific user
server.put("/users/:userId", (req, res) => {
    let id = req.param("userId");
    try {
        res.json(new jsonModel("/api/user/:userId", "PUT", 200, "update a specific user"));
    } catch (error) {
        res.json(error);
    }


});

// Delete specific user
server.delete("/users/:userId", (req, res) => {
    let id = req.params.userId;

    try {
        res.json(new jsonModel("/api/user/:userId", "DELETE", 401, "delete a specific user"));
    } catch (error) {
        res.json(error);
    }
});

module.exports = (server);