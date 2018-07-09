// Contains all of the user-related routes
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/messages', (req, res) => {
  console.log("111");
  res.end();
});

// Get all users
router.get("/users", (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node_getting_started'
  });

  const queryString = "SELECT * FROM users";

  connection.query(queryString, (err, rows, fields) => {
    if (err){
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });

});

// Prevents multiple open mysql connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'node_getting_started'
});

// Handles mySQL database connection
function getConnection(){
  return pool;
}

// Create new user
router.post('/user_create', (req, res) => {
  console.log("Trying to create a new user");

  console.log("First name: " + req.body.create_first_name);
  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if(err) {
      console.log("Failed to add new user: " + err);
      res.sendStatus(500);
      return;
    }

    console.log("Inserted a new user w/ id: ", results.insertId);
    res.end();
  });

  // res.end();
});

// Fetch user by ID
router.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id);

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";

  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err){
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    console.log("Fetched users successfully");

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name};
    });

    res.json(users);
  });

  // res.end();
});

module.exports = router;