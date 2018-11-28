const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

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
                        response.status(201).json(new jsonModel("/api//users", "POST", 201, "User " + username + " has been succesfully created."));
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

static changePassword(username, currentPassword, newPassword, response) {
    User.findOne({username})
        .then((user) => {
            if(user.password === currentPassword) {
                user.set({password: newPassword});
                user.save()
                    .then(() => {
                        response.status(200).json(new jsonModel("/api/users", "PUT", 200, "Your password has been succesfully changed."));
                    })
                    .catch(() => {
                        response.status(500).json(ApiErrors.internalServerError());
                    })
            } else {
                response.status(401).json(ApiErrors.notAuthorised());
            }
        })
        .catch(() => {
            response.status(404).json(ApiErrors.notFound(username));
        });
};

static deleteUser(username, password, response) {
    User.findOne({username})
        .then((user) => {
            if (user.password === password) {
                User.findOneAndDelete({username})
                    .then(() => {
                        response.status(200).json(new jsonModel("/api/users", "DELETE", 200, "The user has been succesfully deleted."))
                    })
                    .catch(() => {
                        response.status(500).json(ApiErrors.internalServerError());

                    })

            } else {
                response.status(401).json(ApiErrors.notAuthorised());
            }
        })
        .catch(() => {
            response.status(404).json(ApiErrors.notFound());
        });
    }
};



// module.exports = [User, createUser];