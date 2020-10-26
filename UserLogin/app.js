const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');

const app = express();

const connection = mongoose.connect('mongodb+srv://restapi-tutorial:' + process.env.DB_PASS + '@cluster0.19td7.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    sameSite: true,
    cookie: {
        maxAge: 1000 * 60 //1 minute
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.get('/', (req, res, next) => {
    res.render('pages/index.ejs');
    res.status(200);
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/dashboard', dashboardRoute);

module.exports = app;