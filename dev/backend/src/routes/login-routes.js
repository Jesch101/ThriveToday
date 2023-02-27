const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const username = "admin";
    const password = "password";

    if (req.body.username === username && req.body.password === password) {
        req.session.username = username;
        req.session.password = password;
        res.status(200).send("Login success");
    } else {
        res.status(401).send('Invalid username or password');
    }
});

router.get('/test', (req, res) => {
    console.log(req.session);
    res.json(req.session);
});

router.get('/logout', (req, res) => {
    req.session.destroy();
});

module.exports = router;