const User = require('../src/user');
const Thread = require('../src/thread');
const Comment = require('../src/comment');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

module.exports = class StudditThread {

    static createThread(title, content, username, res) {

        const newThread = new Thread({
            title: title,
            content: content
        });

        let myUser = User;
        myUser.findOne({username})
            .then((user) => {
                user.threads.push(newThread);
                Promise.all([user.save(), newThread.save()])
                // user.save()
                    .then(() => {
                        // newThread.save();
                        res.status(201).json(new jsonModel("/api/threads", "POST", 201, "The thread has been succesfully created."));
                    })
                    .catch(() => {
                        res.status(500).json(ApiErrors.internalServerError());
                    })
            })
            .catch(() => {
                res.status(404).json(ApiErrors.notFound(username));
            })
    };

    static updateThread(id, newContent, res) {
        let myThread = Thread;
        myThread.findOne({_id: id})
            .then((thread) => {
                thread.content = newContent;
                thread.save();
            }).then(() => {
            res.status(200).json(new jsonModel("/api/threads", "PUT", 200, "The thread has been succesfully updated."));
        })
            .catch(() => {
                res.status(500).json(ApiErrors.internalServerError());
            }).catch(() => {
            res.status(404).json(ApiErrors.notFound(id));
        })
    };

    static deleteThread(id, username, res) {
        let myThread = Thread;
        myThread.findOne({_id: id})
            .then((thread) => {
                if (thread) {

                    thread.remove()
                        .then(() => {
                            User.findOneAndUpdate({ username }, { $pull: { "threads": id } })
                                .then(() => {
                                    console.log("Thread deleted from user")
                                })

                                .catch(() => {
                                    res.status(500).json(ApiErrors.internalServerError());
                                })
                        });
                res.status(200).json(new jsonModel("/api/threads/" + id, "DELETE", 200, "Thread removed"))
                } else {
                    res.status(404).json(ApiErrors.notFound(id));
                }
            })
            .catch(() => {
                res.status(404).json(ApiErrors.notFound(id));
            })
    }

};