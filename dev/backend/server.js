const express = require('express');
const session = require('express-session');

const aboutroute = require('./src/routes/aboutus-routes');
const popplansroute = require('./src/routes/popplans-routes');
const planroute = require('./src/routes/plan-routes');

const loginroute = require('./src/routes/login-routes');
const dbusersroute = require('./src/routes/dbusers-routes');
const signuproute = require('./src/routes/signup-routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("Hello ThriveToday:)");
});

app.use('/api/aboutus', aboutroute); 
app.use('/api/popularplans', popplansroute);
app.use('/api/plans', planroute);
app.use('/api/login', loginroute);
app.use('/api/signup', signuproute)
app.use('/api/users', dbusersroute);

app.listen(port, () => console.log(`app is listening on port ${port}`));