// Best practice would be to do this in environment variables.
const NEO4J_USERNAME = 'redoneo';
const NEO4J_PASSWORD = 'b.cQB8gxmtJavx.akme3ztHzNbpOj5t';

const neo4j = require('neo4j-driver').v1;

let driver;

driver = neo4j.driver('bolt://hobby-bmgmbaaccbcogbkeoajgggcl.dbs.graphenedb.com:24786',
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));

module.exports = driver;