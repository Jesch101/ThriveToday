const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.tt_db_user,
    host: process.env.tt_db_host,
    database: process.env.tt_db_dbname,
    password: process.env.tt_db_password,
    port: 5432
});

module.exports = pool;