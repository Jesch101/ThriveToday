const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'db.ubfgeubnvkvukzyqfrgp.supabase.co',
    database: 'postgres',
    password: 'AjNWrYvlKCDrAeYk',
    port: 5432
});

module.exports = pool;