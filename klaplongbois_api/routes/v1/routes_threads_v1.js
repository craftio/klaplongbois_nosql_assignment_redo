let express = require('express');
let server  = express();
let jsonModel = require('../../model/JsonResponseModel');
let mongoose = require('mongoose');
let thread = require('../../data/threadRepo');

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
server.post("/threads", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.name;

    try {
        thread.createThread(title, content, username, res);
    } catch (error) {
        res.json(error);
    }
});

// Update a specific thread
server.put("/threads/:id", (req, res) => {
   let threadId = req.params.id;
   let newContent = req.params.newContent;
   try {

       thread.updateThread(threadId, newContent, res);
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