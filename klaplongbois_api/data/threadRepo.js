const User = require('../src/user');
const Thread = require('../src/thread');
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
};