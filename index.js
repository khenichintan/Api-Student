const express = require('express');

const port = 8080;

const app = express();

const db = require('./config/mongoos');

const passport = require('passport');
const passportLocal = require('./config/passport');
const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name: "node",
    secret: "nodecode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./router/adminrouter'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log("server is  running", port);
})