let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let mongoose = require('mongoose');
let user = require('../../data/userRepo');


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
    let username = req.body.username;
    let password = req.body.password;

    try {
        if (username !== null && username !== undefined && password !== null && password !== undefined) {
            user.createUser(username, password, res);
        } else if (username !== null && username !== undefined) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'password'"));
        } else if (password !== null && password !== undefined) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'username'"));
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username' and 'password'"));
        }
    } catch (error) {
        res.json(error);
    }
});

// Change password
server.put("/users", (req, res) => {
    let username = req.body.name;
    let currentPassword = req.body.password;
    let newPassword = req.body.newPassword;

    try {
        user.changePassword(username, currentPassword, newPassword, res);
    } catch (error) {
        res.json(error);
    }


});

// Delete specific user
server.delete("/users", (req, res) => {
    let username = req.body.name;
    let password = req.body.password;

    try {
        user.deleteUser(username, password, res);
    } catch (error) {
        res.json(error);
    }
});

module.exports = (server);