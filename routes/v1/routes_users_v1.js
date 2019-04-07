let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let mongoose = require('mongoose');
let user = require('../../data/userRepo');


server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

// Create a user
server.post("/users", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        // Both username and password are put in.
        if (checkNullOrUndefined(username) && checkNullOrUndefined(password)) {
            user.createUser(username, password, res);
            // The password field is missing.
        } else if (checkNullOrUndefined(username)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'password'"));
            // The username field is missing.
        } else if (checkNullOrUndefined(password)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'username'"));
            // Both fields are missing.
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username' and 'password'"));
        }
    } catch (error) {
        res.json(error);
    }
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

// Change password
server.put("/users", (req, res) => {
    let username = req.body.username;
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;

    try {
        if (checkNullOrUndefined(username) && checkNullOrUndefined(currentPassword) && checkNullOrUndefined(newPassword)) {
            user.changePassword(username, currentPassword, newPassword, res);
        } else if (checkNullOrUndefined(username) && checkNullOrUndefined(currentPassword)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'newPassword'"));
        } else if (checkNullOrUndefined(username) && checkNullOrUndefined(newPassword)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'currentPassword'"));
        } else if (checkNullOrUndefined(currentPassword) && checkNullOrUndefined(newPassword)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'username'"));
        } else if (checkNullOrUndefined(username)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'currentPassword' and 'newPassword'"));
        } else if (checkNullOrUndefined(currentPassword)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username' and 'newPassword'"));
        } else if (checkNullOrUndefined(newPassword)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username' and 'currentPassword'"));
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username', 'currentPassword' and 'newPassword'"));
        }
    } catch (error) {
        res.json(error);
    }


});

// Delete specific user
server.delete("/users", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        // Both username and password are put in.
        if (checkNullOrUndefined(username) && checkNullOrUndefined(password)) {
            user.deleteUser(username, password, res);
        // The password field is missing.
        } else if (checkNullOrUndefined(username)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'password'"));
        // The username field is missing.
        } else if (checkNullOrUndefined(password)) {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory field 'username'"));
        // Both fields are missing.
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing mandatory fields 'username' and 'password'"));
        }
    } catch (error) {
        res.json(error);
    }
});

function checkNullOrUndefined(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);