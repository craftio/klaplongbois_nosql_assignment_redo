let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let comment = require('../../data/commentRepo');

server.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

// Get all comments
server.get("/comments", (req, res) => {
    try {
        res.status(200);
        res.json(new jsonModel("/api/comments", "GET", 200));
    } catch (error) {
        res.json(error);
    }
});

// Get a specific comment
server.get("/comments/:commentId", (req, res) => {
    let commentId = req.params.commentId;
    try {
        res.status(200);
        res.json(new jsonModel("/api/comments/commentId", "GET", 200));
    } catch (error) {
        res.json(error);
    }
});

// Create a comment
server.post("/comments/:threadId", (req, res) => {
   let id = req.params.threadId;
   let username = req.body.username;
   let content = req.body.content;
   try {
       if (checkNullOrUndefined(id) && checkNullOrUndefined(username) && checkNullOrUndefined(content)) {
           comment.addComment(id, content, username, res);
       } else {
           res.json(new jsonModel("/api/user", "POST", 400, "Missing at least one of mandatory fields 'username' and 'content'."));
       }
   } catch (error) {
       res.json(error);
   }
});

// Update a comment
server.put("/comments/:commentId", (req, res) => {
    let commentId = req.params.commentId;
    try {

        res.status(200);
        res.json(new jsonModel("/api/comments/commentId", "PUT", 200));
    } catch (error) {
        res.json(error);
    }
});

// Delete a comment
server.delete("/comments/:threadId/:commentId", (req, res) => {
    let threadId = req.params.threadId;
    let commentId = req.params.commentId;

    try {
        if (checkNullOrUndefined(threadId) && checkNullOrUndefined(commentId)) {
            comment.deleteComment(commentId, threadId, res);
        } else {
            res.json(new jsonModel("/api/user", "POST", 400, "Missing at least one mandatory param, comments/:threadId/:commentId."));
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