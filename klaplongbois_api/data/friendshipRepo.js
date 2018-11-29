const neo4j = require('../neo4jdriver');
const session = neo4j.session();
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');
module.exports = class StudditFriendship {

    static createFriendship(username, friendUsername, res) {
        const user = username;
        const friend = friendUsername;

        session.run('MATCH (a:User {user: "' + user + '"}) ' +  'MATCH (b:User {user: "' + friend + '"}) ' +
                'MERGE (a)-[:FRIENDS_WITH]-(b)')
            .then((result) => {
                result.records.forEach((record) => {});
                session.close();
                res.status(200).json(new jsonModel("/api/friendships", "POST", 200, "A friendship has been established between " + user + " and " + friend));
            })
            .catch((error) => {
                res.status(500).json(ApiErrors.internalServerError());
                console.log(error);
            });
    }

    static deleteFriendship(username, friendUsername, res) {
        const user = username;
        const friend = friendUsername;

        session
            .run('MATCH (a:User {username: "'+ user +'"}) ' +'MATCH (b:User {username: "'+ friend +'"}) ' +'MATCH (a)-[r]-(b) ' +'DELETE r')
            .then((result) => {
                result.records.forEach(function (record) {});
                session.close();
                res.status(200).json(new jsonModel("/api/friendships", "DELETE", 200, user + " and " + friend + " are no longer friends"));
            })
            .catch((error) => {
                res.status(500).json(ApiErrors.internalServerError());
                console.log(error);
            });

    }
};