const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApiErrors = require('../model/apiErrors');

const UserSchema = new Schema({
    username: String,
    password: String,
    threads: [{
        type: Schema.Types.ObjectId,
        ref: 'thread'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});


const User = mongoose.model('user', UserSchema);

module.exports = class StudditUser {

static createUser(username, password, response) {
        User.findOne({username})
            .then((user) => {
                if (user === null) {
                    const newUser = new User({username: username, password: password});
                    newUser.save()
                        .then(() => {
                            console.log("User " + username + " has been succesfully created.");
                            response.status(201).json({username: username});
                        })
                        .catch(() => {
                            console.log("Something went wrong. User " + user + " has not been created.");
                            response.status(500).json(ApiErrors.internalServerError());
                        })
                } else {
                    response.status(420).json(ApiErrors.userExists());
                }
            })
            .catch(() => {
                response.status(500).json(ApiErrors.internalServerError());
            });
    }
};

// module.exports = [User, createUser];