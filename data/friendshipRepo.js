const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://hobby-bmgmbaaccbcogbkeoajgggcl.dbs.graphenedb.com:24786',
    neo4j.auth.basic('redone', 'b.cQB8gxmtJavx.akme3ztHzNbpOj5t'));
const ApiErrors = require('../model/apiErrors');
const jsonModel = require('../model/JsonResponseModel');
module.exports = class StudditFriendship {

    static createFriendship(username1, username2, res) {
        const user1 = username1;
        const user2 = username2;

        const session1 = driver.session();
        session1.run('MATCH (a:User {name: $name}) RETURN a', {name: user1}).then((resu1) => {
            resu1.records.forEach((record) => {

            });
            session1.close();
        }).catch((err) => {
            session1.close();
            const session = driver.session();
            session.run('CREATE (a:User {name: $name}) RETURN a', {name: user1})
                .then((resu) => {
                    resu.records.forEach((record) => {

                    });
                    session.close();
                }).catch((err) => {
                    session.close();
            });
        });

        const session2 = driver.session();
        session2.run('MATCH (a:User {name: $name}) RETURN a', {name: user2})
            .then((resu2) => {
                resu2.records.forEach((record) => {

                });
            session2.close();
        }).catch((err) => {
            session2.close();
            const session = driver.session();
            session.run('CREATE (a:User {name: $name}) RETURN a', {name: user2})
                .then((resu) => {
                    resu.records.forEach((record) => {

                    });
                    session.close();
                }).catch((err) => {
                    session.close();
            });
        });

        const session3 = driver.session();
        session3.run('MATCH (a:User {name: $user1}) ' +
                    'MATCH (b:User {name: $user2}) ' +
                    'MERGE (a)-[f:FRIEND]-(b)', {user1: user1, user2: user2})
            .then((resu) => {
                resu.records.forEach((record) => {

                });
                session3.close();
            }).catch((err) => {
                session3.close();
        });

        res.status(200).json(new jsonModel("/api/friendships", "POST", 200, "A friendship has been established between " + user1 + " and " + user2));
    }

    static deleteFriendship(username1, username2, res) {
        const user1 = username1;
        const user2 = username2;

        const session = driver.session();
        session.run('MATCH (a:User {name: $user1})-[f:FRIEND]-(b:User {name: $user2}) DELETE f', {'user1': user1, 'user2': user2})
            .then((resu) => {
                resu.records.forEach((record) => {

                });
                session.close();
            }).catch((err) => {
                session.close();
        });

        res.status(200).json(new jsonModel("/api/friendships", "DELETE", 200, "Friendship succesfully deleted."));
    }
};