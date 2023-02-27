const express = require('express');
const session = require('express-session');

const aboutroute = require('./src/routes/aboutus-routes');
const popplansroute = require('./src/routes/popplans-routes');
const loginroute = require('./src/routes/login-routes');
const dbusersroute = require('./src/routes/dbusers-routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("Hello ThriveTogether :)");
});

app.use('/aboutus', aboutroute); 
app.use('/popularplans', popplansroute);
app.use('/login', loginroute);
app.use('/api/users', dbusersroute);

app.listen(port, () => console.log(`app is listening on port ${port}`));