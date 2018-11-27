let express = require('express');
let server  = express();
let jsonModel = require('../../model/JsonResponseModel');

server.use("/", (req, res, next) => {
    res.contentType('application/json');
    next();
});

// Get all threads
server.get("/threads", (req, res) => {
    try {

        res.status(200);
        res.json(new jsonModel("/api/threads", "GET", 200));
    } catch (error) {
        res.json(error);
    }
});

// Get a specific thread
server.get("/threads/:threadId", (req, res) => {
    let threadId = req.params.threadId;
    try {

        res.status(200);
        res.json(new jsonModel("/api/threads/threadId", "GET", 200));
    } catch (error) {
        res.json(error);
    }
});

// Create a thread
server.post("/threads/:threadId", (req, res) => {
    let threadId = req.params.threadId;
    try {

        res.status(200);
        res.json(new jsonModel("/api/threads/threadId", "POST", 200));
    } catch (error) {
        res.json(error);
    }
});

// Update a specific thread
server.put("/threads/:threadId", (req, res) => {
   let threadId = req.params.threadId;
   try {

       res.status(200);
       res.json(new jsonModel("/api/threads/threadId", "PUT", 200));
   } catch (error) {
       res.json(error);
   }
});

// Delete a specific thread
server.delete("/threads/:threadId", (req, res) => {
    let threadId = req.params.threadId;
    try {


        res.status(200);
        res.json(new jsonModel("/api/threads/threadId", "DELETE", 200))
    } catch (error) {
        res.json(error);
    }
});



module.exports = (server);