let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');

server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

server.get("/", (req, res) => {
    res.status(200);
    res.send("test friendship routes v1");
});

// Get all friendships
server.get("/friendships", (req, res) => {
    res.status(200);
    res.json(new jsonModel("GET /api/friendships", 200, "test"));
});

module.exports = (server);
