"use strict";
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');

app.use(session ({
  key: 'keyin',
  secret: 'secret0982348934',
  store: sessionData,
  resave: false,
  saveUninitialized: true
}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('./'));

const port = process.env.PORT || 8000;


var sessionConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'BBY7_members'
});


var sessionData = new MySQLStore({
  expiration: 10800000,
  createDatabaseTable: true,
  schema:{
    tableName: 'sessiontbl',
    columnNames:{
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

// Supply index page
app.get('/', function(req, res) {
  res.sendFile('./index.html');
});

// Logout, route to index
app.get('/logout', function(req,res){
  req.session.destroy(function(err){
      if(!err){
          res.send("Logged Out")
      } else {
        res.sendFile('/');
      }
  })
});

// Login, route to landing page on success
app.post('/login', function(req, res, next) {
  
  const email = req.body.email;
  const password = req.body.password;
  
  sessionConnection.query(
    'SELECT * FROM BBY7_user WHERE email = ? AND password = ?', 
    [email, password],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      }
      if(results.length > 0) {
        res.redirect('./landing.html');
      } else {
        res.redirect('/');
      }
    }
    )
});

// Delete Account, routes back to the dashboard upon completion.
app.post('/deleteAccount', function(req, res, next) {
  
  const input = req.body.delInput;

  sessionConnection.query('DELETE FROM BBY7_user WHERE ID = ?', [input])
  res.redirect('./admindashboard.html');
});

// Account signup code
app.post('/signup', function(req, res, next) {
  
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, city, admin) VALUES (?, ?, ?, ?, FALSE)'),
    [fullname, email, password, city];
    res.redirect('./index.html');
});

app.post('/adminCreate', function(req, res, next) {
  
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, city, admin) VALUES (?, ?, ?, ?, FALSE)'),
    [fullname, email, password, city];
    res.redirect('./admindashboard.html');
});

app.post



app.listen(process.env.PORT || 8000, function() {
  console.log('App started on port ' + port);
});

