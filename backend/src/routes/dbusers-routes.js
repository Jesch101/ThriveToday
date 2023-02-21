const {Router} = require("express");
const {Pool} = require("pg");

const router = Router();
const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
});

router.get('/', (req, res) => {
    pool.query("SELECT * FROM users", (err, db) => {
        if (err) {
            console.error(err);
            res.send("Query failed");
            return;
        }
        res.json({users: db.rows});
    });
});

module.exports = router;