// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

//BodyParser
const bodyParser = require('body-parser');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use(express.static('public'));
// app.use(express.static('views'));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
app.use('/', require('./routes/index'));
app.use('/celebs', require('./routes/other/celebs'));
app.use('/movies', require('./routes/other/movies'));

// all your routes here

module.exports = router;

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

app.listen(3000, () => console.log(`Listening on port 3000`));
