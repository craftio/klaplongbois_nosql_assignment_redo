const User = require('../src/user');
const Thread = require('../src/thread');
const Comment = require('../src/comment');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

module.exports = class StudditComments {

    static addComment(id, content, username, res) {

        const newComment = new Comment({
            postedBy: username._id,
            content: content
        });

        User.findOne({username})
            .then((user) => {
                Thread.findOne({_id: id})
                    .then((thread) => {
                        thread.comments.push(newComment);
                        Promise.all([user.save(), thread.save(), newComment.save()])
                            .then(() => {
                                res.status(201).json(new jsonModel("/api/comments", "POST", 201, "Comment has been succesfully created"));
                            })
                            .catch(() => {
                                res.status(500).json(ApiErrors.internalServerError());
                            })
                    })
                    .catch(() => {
                        res.status(404).json(ApiErrors.notFound());
                    })
                .catch(() => {
                    res.status(404).json(ApiErrors.notFound());
                })
            })
    }
};