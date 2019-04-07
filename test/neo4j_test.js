const assert = require('assert');
const driver = require('../neo4jdriver');

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