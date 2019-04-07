const User = require('../src/user');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');

module.exports = class StudditUser {

    static createUser(usernameParam, passwordParam, response) {
        User.findOne({ username: usernameParam })
            .then((user) => {
                if (user === null) {
                    const newUser = new User({
                        username: usernameParam,
                        password: passwordParam
                    });
                    newUser.save()
                        .then((user) => {
                            response.status(201).json(new jsonModel("/api/users", "POST", 201, "User " + user.username + " has been succesfully created."));
                        })
                        .catch((error) => {
                            console.log("Something went wrong. User " + user + " has not been created.");
                            response.status(500).json(ApiErrors.internalServerError());
                        })
                } else {
                    response.status(409).json(new jsonModel("/api/users", "POST", 409, "User " + usernameParam + " already exists"));
                }
            })
            .catch(() => {
                response.status(500).json(ApiErrors.internalServerError());
            });
    }
    
    static changePassword(usernameParam, currentPassword, newPassword, response) {
        User.findOne({ username: usernameParam })
            .then((user) => {
                console.log(user);
                if(user.password === currentPassword) {
                    user.set({ password: newPassword });
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
                response.status(400).json(new jsonModel("/api/users", "PUT", 400, "User " + usernameParam + " not found"));
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
                response.status(422).json(new jsonModel("/api/users", "DELETE", 422, "The user does not exist"));
            });
    }
};
