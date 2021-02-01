const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB Connected!")
});

//Setup template engine
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

require("./routes/routes")(app)

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.render('404')
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})