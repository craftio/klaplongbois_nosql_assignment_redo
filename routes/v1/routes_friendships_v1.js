let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let friendship = require('../../data/friendshipRepo');

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
server.post("/friendships", (req, res) => {
    let username = req.body.name;
    let friendusername = req.body.friendname;
    try {

        friendship.createFriendship(username, friendusername, res);
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
server.delete("/friendships", (req, res) => {
    let user = req.body.name;
    let friend = req.body.friendname;
    try {
        friendship.deleteFriendship(user, friend, res);
    } catch (error) {
       res.json(error);
    }
});

module.exports = (server);
