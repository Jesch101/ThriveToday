const bcrypt = require("bcrypt");
const express = require('express');
const pool = require("../../db");
const queries = require("./../queries");
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    console.log(username);

    const {rows: userInfo} = await pool.query(queries.getUserByUsername, [username]);
    console.log(userInfo);
    if (!userInfo.length) {
        res.status(401).send('Invalid username or password');
        return;
    }

    const passwordValid = await bcrypt.compare(password, userInfo[0].password);
    if (!passwordValid) {
        res.status(401).send('Invalid username or password');
        return;
    }

    req.session.username = username;
    req.session.password = password;
    res.status(200).send("Login success");
});

router.get('/test', (req, res) => {
    console.log(req.session);
    res.json(req.session);
});

router.get('/logout', (req, res) => {
    req.session.destroy();
});

module.exports = router;