let express = require('express');
let server = express();

server.use('/api', require('./routes/routes_v1'));

server.listen(3000, () => {
    console.log("test1");
});