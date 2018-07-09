// Use "nodemon app.js" instead of "node app.js" to watch for changes and automatically restart (no refreshing the page needed)

// Load app server using express
const express = require('express');
const app = express();

const morgan = require('morgan'); // Outputs request logs
app.use(morgan('short')); // arguments: short, combined

const mysql = require('mysql'); // use w/ mysql database

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); // helps process requests

app.use(express.static('./public')); // serves static files (HTML)

const router = require('./routes/user.js') // refactored code into modules
app.use(router);

// Homepage
// GET request
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from root");
});

// Listen to server on port #
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});