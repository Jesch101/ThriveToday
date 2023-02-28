const Pool = require('pg').Pool;

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
});

module.exports = pool;