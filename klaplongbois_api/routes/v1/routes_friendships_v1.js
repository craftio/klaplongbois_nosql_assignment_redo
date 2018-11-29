let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');

server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

// Get all friendships
server.get("/friendships", (req, res) => {
    try {


        res.status(200);
        res.json(new jsonModel("/api/friendships", "GET", 200, "test"));
    } catch (error) {
        res.json(error);
    }
});

// Get a specific friendship
server.get("/friendships/:friendshipId", (req, res) => {
    let friendshipId = req.params.friendshipId;
    try {


        res.status(200);
        res.json(new jsonModel("api/friendships/friendshipId", "GET", 200, "test"));
    } catch (error) {
        res.json(error);
    }
});

// Create a friendship
server.post("/friendships/:friendshipId", (req, res) => {
    let friendshipId = req.params.friendshipId;
    try {


        res.status(200);
        res.json(new jsonModel("/api/friendships/friendshipId", "POST", 200, "test"));
    } catch (error) {
        res.json(error);
    }
});

// Update a specific friendship
server.put("/friendships/:friendshipId", (req,res) => {
    let friendshipId = req.params.friendshipId;
    try {

        res.status(200);
        res.json(new jsonModel("/api/friendships/friendshipId", "PUT", 200, "test"));
    } catch (error) {
        res.json(error);
    }
});

// Delete a friendship
server.delete("/friendships/:friendshipId", (req, res) => {
    let friendshipId = req.params.friendshipId;
    try {

        res.status(200);
        res.json(new jsonModel("/api/friendships/friendshipId", "DELETE", 200, "test"));
    } catch (error) {
       res.json(error);
    }
});

module.exports = (server);
