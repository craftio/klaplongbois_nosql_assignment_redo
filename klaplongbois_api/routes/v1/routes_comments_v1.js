let express = require('express');
let server  = express.Router();
let jsonModel = require('../../model/JsonResponseModel');
let Comment = require('../../data/commentRepo');

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
   let username = req.body.name;
   try {
       Comment.addComment(id, "MYCOMMENT", username, res);

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
server.delete("/comments/:commentId", (req, res) => {
   let commentId = req.params.commentId;
   try {

       res.status(200);
       res.json(new jsonModel("/api/comments/commentId", "DELETE", 200));
   } catch (error) {
       res.json(error);
   }
});

module.exports = (server);