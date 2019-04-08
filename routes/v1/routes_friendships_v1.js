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
    let user1 = req.body.user1;
    let user2 = req.body.user2;

    if (checkNullOrUndefined(user1) && checkNullOrUndefined(user2)) {
        try {
            friendship.createFriendship(user1, user2, res);
        } catch (error) {
            res.json(error);
        }
    } else {
        res.status(400).json(new jsonModel('/api/friendships', "POST", 400, "Missing at least one of the mandatory fields 'user1' and 'user2'."));
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

function checkNullOrUndefined(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);
