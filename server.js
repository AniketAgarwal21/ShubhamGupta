const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const path = require('path');
// const ejs = require('ejs');

const PORT = process.env.PORT;

app.use(express.static('public'));

//Setup template engine
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

require("./routes/routes")(app)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
}) 