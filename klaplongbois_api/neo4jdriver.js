const NEO4J_USERNAME = 'projectuser-craftio';
const NEO4J_PASSWORD = 'b.ZQh9KmgWgOPc.2HEPtos6BOBtcmLs';

const neo4j = require('neo4j-driver').v1;

let driver;

driver = neo4j.driver('bolt://hobby-bmgmbaaccbcogbkeoajgggcl.dbs.graphenedb.com:24786',
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));

module.exports = driver;