const assert = require('assert');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://hobby-bmgmbaaccbcogbkeoajgggcl.dbs.graphenedb.com:24786',
    neo4j.auth.basic('redone', 'b.cQB8gxmtJavx.akme3ztHzNbpOj5t'));

describe('Neo4j', () => {
    it('saves a node', (done) => {
        const personName = 'Bob';
        let session = driver.session();
        session.run('CREATE (a:Person {name: $name}) RETURN a', {name: personName})
            .then(() => session.run('MATCH (a:Person {name: $name}) RETURN a', {name: personName}))
            .then((result) => {
                const singleRecord = result.records[0];
                const node = singleRecord.get(0);
                assert(personName === node.properties.name);
                session.close();
                done();
            })
            .catch((err) => {
                session.close();
                done(err);
            });
    });
});