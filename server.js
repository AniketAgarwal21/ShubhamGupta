const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const ejs = require('ejs');

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB Connected!")
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Setup template engine
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

require("./routes/routes")(app)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
}) 