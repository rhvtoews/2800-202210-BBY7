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



//dummy account
const userData = {
  fullname: "Ryan Toews",
  username: "ryant",
  password: '12345'
}

var sessionConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
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
})

// Supply index page
app.get('/', function(req, res) {
  res.sendFile('./index.html');
})

// Logout, route to index
app.get('/logout', function(req,res){
  req.session.destroy(function(err){
      if(!err){
          res.send("Logged Out")
      } else {
        res.sendFile('/');
      }
  })
})

// Login, route to landing page on success
app.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  
  sessionConnection.query(
    'SELECT * FROM BBY7_user WHERE username = ? AND password = ?', 
    [username, password],
    function(err, records, fields) {
      if(err) {
        console.log(err);
      }
      if(records.length > 0) {
        res.redirect('./landing.html');
      } else {
        res.redirect('/');
      }
    }
    )
});



app.listen(process.env.PORT || 8000, function() {
  console.log('App started on port ' + port);
});

