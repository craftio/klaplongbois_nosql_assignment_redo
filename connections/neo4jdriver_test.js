// Best practice would be to do this in environment variables.
const NEO4J_USERNAME = 'tester';
const NEO4J_PASSWORD = 'b.m4W5RjmU0cIt.K1fk2uXmB7ADFXHt';
const NEO4J_CONNECTION_STRING = 'bolt://hobby-amokkgbadkkkgbkelcehaacl.dbs.graphenedb.com:24787';

const neo4j = require('neo4j-driver').v1;

let driver;

driver = neo4j.driver(NEO4J_CONNECTION_STRING,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));

module.exports = driver;