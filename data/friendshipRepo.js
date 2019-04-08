const neo4j = require('../connections/neo4jdriver');
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');
module.exports = class StudditFriendship {

    static createFriendship(username1, username2, res) {
        const user1 = username1;
        const user2 = username2;

        const session1 = neo4j.session();
        session1.run('MATCH (a:User {name: $user1}) ', {'user1': user1}).then((res) => {
            res.records.forEach((record) => {

            });
            session1.close();
        }).catch((err) => {
            session1.close();
            const session = neo4j.session();
            session.run('CREATE (a:User {name: $user1})', {'name': user1})
                .then((res) => {
                    res.records.forEach((record) => {

                    });
                    session.close();
                }).catch((err) => {
                    session.close();
            });
        });

        const session2 = neo4j.session();
        session2.run('MATCH (a:User {name: $user2}) ', {'user2': user2})
            .then((res) => {
                res.records.forEach((record) => {

                });
            session2.close();
        }).catch((err) => {
            session2.close();
            const session = neo4j.session();
            session.run('CREATE (a:User {name: $user2})', {'name': user2})
                .then((res) => {
                    res.records.forEach((record) => {

                    });
                    session.close();
                }).catch((err) => {
                    session.close();
            });
        });

        const session3 = neo4j.session();
        session3.run('MATCH (a:User {name: $user1}) ' +
                    'MATCH (b:User {name: %user2}) ' +
                    'MERGE (a)-[f:FRIEND]-(b)', {'user1': user1, 'user2': user2})
            .then((res) => {
                res.records.forEach((record) => {

                });
                session3.close();
            }).catch((err) => {
                session3.close();
        });

        res.status(200).json(new jsonModel("/api/friendships", "POST", 200, "A friendship has been established between " + user1 + " and " + user2));

        /**
        session.run('MATCH (a:User {user: "' + user + '"}) ' +  'MATCH (b:User {user: "' + friend + '"}) ' +
                'MERGE (a)-[:FRIENDS_WITH]-(b)')
            .then((result) => {
                result.records.forEach((record) => {});
                session.close();
                res.status(200).json(new jsonModel("/api/friendships", "POST", 200, "A friendship has been established between " + user + " and " + friend));
            })
            .catch((error) => {
                res.status(422).json(new jsonModel("/api/friendships", "POST", 422,  user + " or " + friend + " does not exist"));
                console.log(error);
            });
         */
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
                res.status(422).json(new jsonModel("/api/friendships", "DELETE", 422, user + " or " + friend + " does not exist"));
                console.log(error);
            });

    }
};