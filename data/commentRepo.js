const User = require('../src/user');
const Thread = require('../src/thread');
const Comment = require('../src/comment');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

module.exports = class StudditComments {

    static getSingleComment(usernameParam, res) {
        User.findOne({ username: usernameParam})
            .then((user) => {
                if (user !== null && user !== undefined) {
                    res.status(200).json({"username": user})
                }
                else {
                    res.status(500).json(new jsonModel("/api/comments/:commentID", "GET", 500, "GET single comment", "User not found"))
                }
            })
            .catch(() => {
                res.status(404).json(new jsonModel("/api/comments/:commentID", "GET", 200, "GET single comment", "User not found"))
            })
    }

    static addComment(id, content, usernameParam, res) {
        User.findOne({ username: usernameParam })
            .then((user) => {
                Thread.findOne({ _id: id })
                    .then((thread) => {
                        thread.comments.push({
                            user: user._id,
                            content: content
                        });
                        thread.save()
                            .then(() => {
                                res.status(201).json(new jsonModel("/api/comments/threadId", "POST", 201, "Succesfully commented on thread."));
                            });
                    })
                    .catch(() => {
                        res.status(404).json(ApiErrors.notFound());
                    })
                .catch(() => {
                    res.status(422).json("/api/comments/:threadId", "POST", 422, "You can't comment on an non-existing thread.");
                })
            })
    }

    static deleteComment(id, threadId, res) {
        Comment.findOneAndDelete({_id: id})
            .then(() => {
                Thread.findOneAndUpdate({_id: threadId}, {$pull: {"comments": id}})
                    .then(() => {
                        res.status(200).json(new jsonModel("/api/comments/" + id, "DELETE", 200, "Comment has been succesfully deleted"));
                    })
                    .catch(() => {
                            res.status(500).json(ApiErrors.internalServerError());
                        }
                    )
                    .catch(() => {
                        res.status(422).json(new jsonModel("/api/comments/" + id, "DELETE", 422, "Comment not found"));
                    })
            })
    }

    static deleteCommentsFromThread(threadId) {
        Comment.findOneAndDelete({ onThread: { $in: threadId }});
    }
};

