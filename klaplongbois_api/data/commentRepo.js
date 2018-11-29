const User = require('../src/user');
const Thread = require('../src/thread');
const Comment = require('../src/comment');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

module.exports = class StudditComments {

    static getSingleComment() {

    }

    static addComment(id, content, usernameParam, res) {
        User.findOne({ username: usernameParam })
            .then((user) => {
                Thread.findOne({ _id: id })
                    .then((thread) => {
                        if (thread !== null && thread !== undefined) {
                            const newComment = new Comment({
                                postedBy: user,
                                onThread: thread,
                                content: content
                            });
                            thread.comments.push(newComment);
                            Promise.all([user.save(), thread.save(), newComment.save()])
                                .then(() => {
                                    res.status(201).json(new jsonModel("/api/comments", "POST", 201, "Comment has been succesfully created"));
                                })
                                .catch(() => {
                                    res.status(500).json(ApiErrors.internalServerError());
                                })
                        } else {
                            res.status(404).json(new jsonModel("/api/user", "POST", 404, "You can't comment on an non-existing thread."));
                        }
                    })
                    .catch(() => {
                        res.status(404).json(ApiErrors.notFound());
                    })
                .catch(() => {
                    res.status(404).json(ApiErrors.notFound());
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
                        res.status(500).json(ApiErrors.internalServerError());
                    })
            })
    }

    static deleteCommentsFromThread(threadId) {
        Comment.findOneAndDelete({ onThread: { $in: threadId }});
    }
};

