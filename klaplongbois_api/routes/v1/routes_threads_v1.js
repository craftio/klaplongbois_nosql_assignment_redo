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

        thread.getAllThreads(res);
    } catch (error) {
        res.json(error);
    }
});

// Get a specific thread
server.get("/threads/:threadId", (req, res) => {
    let threadId = req.params.threadId;
    try {
        thread.getSingleThread(threadId, res);
    } catch (error) {
        res.json(error);
    }
});

// Create a thread
server.post("/threads", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.username;

    try {
        // Checks for mandatory fields like in user, with a cleaner response to save in if else statements.
        if (checkNullOrUndefined(title) && checkNullOrUndefined(content) && checkNullOrUndefined(username)) {
            thread.createThread(title, content, username, res);
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing at least one of mandatory fields 'title', 'content' and 'username'"));
        }
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
server.delete("/threads/:Id", (req, res) => {
    let threadId = req.params.Id;
    let username = req.body.name;
    try {

        thread.deleteThread(threadId, username, res);
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