const express = require('express');

const aboutroute = require('./src/routes/aboutus-routes');
const popplansroute = require('./src/routes/popplans-routes');
const planroute = require('./src/routes/plan-routes');

const loginroute = require('./src/routes/login-routes');
const dbusersroute = require('./src/routes/dbusers-routes');
const signuproute = require('./src/routes/signup-routes');

const app = express();
const port = 3000;

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Hello ThriveToday:)");
});

app.use('/aboutus', aboutroute); 
app.use('/popularplans', popplansroute);
app.use('/plans', planroute);
app.use('/login', loginroute);
app.use('/signup', signuproute)
app.use('/api/users', dbusersroute);

app.listen(port, () => console.log(`app is listening on port ${port}`));