const cors = require("cors");
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();

const planroute = require("./src/routes/plan-routes");

const loginroute = require("./src/routes/login-routes");
const dbusersroute = require("./src/routes/dbusers-routes");
const { errorHandler } = require("./src/middleware/errorMiddleware");

const app = express();
const port = process.env.port || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/plans", planroute);
app.use("/api/login", loginroute);
app.use("/api/users", dbusersroute);

app.use(errorHandler);

app.listen(port, () => console.log(`app is listening on port ${port}`));
