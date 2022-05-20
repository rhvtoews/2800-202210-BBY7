"use strict";
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const { JSDOM } = require('jsdom');
const fs = require("fs");
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');



app.use(session ({
  key: 'keyin',
  secret: 'secret0982348934',
  store: sessionData,
  resave: false,
  saveUninitialized: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('./'));


// DB Location constants
const is_heroku = process.env.IS_HEROKU || false;
const port = process.env.PORT || 8000;

var sess;

// Database declarations
const dbConfigHeroku = {
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b7bc82056b389e',
  password: '8f0a455b',
  database: 'heroku_6bb5156c76d47cb'
};

const dbConfigLocal = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'BBY7_members'
}

if (is_heroku) {
  var sessionConnection = mysql.createPool(dbConfigHeroku);
} else {
  var sessionConnection = mysql.createPool(dbConfigLocal);
}

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
  if (!sessionData) {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.sendFile(__dirname + '/landing.html');
  }
});


// Supply landing page
app.get('/landing', function(req, res) {
  res.sendFile(__dirname + '/landing.html');
});


// Supply dashboard page
app.get('/dashboard', function(req, res) {
  res.sendFile(__dirname + '/Dashboard/dashboard.html');
});

// Supply register page
app.get('/register', function(req, res) {
  res.sendFile(__dirname + '/register.html');
});

// Logout, route to index
app.get('/logout', function(req,res){
  req.session.destroy(function(err){
      if(!err){
          res.send("Logged Out")
      } else {
        res.redirect('/');
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
        sess = req.session;
        sess.userID = 
        res.redirect('/landing');
      } else {
        res.redirect('/');
      }
    }
    )
});

// Plants Population //

app.get("/plantscards", function(req, res) {

  // check for a session first!
  if(req.session.loggedIn) {

      let profile = fs.readFileSync("./plantscards.html", "utf8");
      let profileDOM = new JSDOM(profile);
  }
});


// Delete Account, routes back to the dashboard upon completion.
app.post('/deleteAccount', function(req, res, next) {
  
  const delInput = req.body.delInput;

  sessionConnection.query('DELETE FROM BBY7_user WHERE ID = ?', [delInput])
  res.redirect('./Dashboard/dashboard.html');
});

// Account signup code
app.post('/signup', function(req, res, next) {
  
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var city = req.body.city;
  

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, city, admin) VALUES (?, ?, ?, ?, ?)',
    [fullname, email, password, city, '0']);
    res.redirect('./index.html');

});

// Changes name
app.post('/changeName', function(req, res, next) {
  const fullname = req.body.fullname;
  const id = session.id;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.fullname = ? WHERE BBY7_user.ID = ?',
  [fullname, id], function(err, results, fields){})
});

// Changes email
app.post('/changeEmail', function(req, res, next) {
  const email = req.body.email;
  const id = session.id;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.email = ? WHERE BBY7_user.ID = ?',
  [email, id], function(err, results, fields){})
});

// Changes password
app.post('/changePassword', function(req, res, next) {
  const password = req.body.password;
  const id = session.id;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.password = ? WHERE BBY7_user.ID = ?',
  [password, id], function(err, results, fields){})
});

// Changes city
app.post('/changeCity', function(req, res, next) {
  const city = req.body.city;
  const id = session.id;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.city = ? WHERE BBY7_user.ID = ?',
  [city, id], function(err, results, fields){})
});


app.post('/adminCreate', function(req, res, next) {
  
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, city, admin) VALUES (?, ?, ?, ?, FALSE)'),
    [fullname, email, password, city];
    res.redirect('dashboard');
});


// Create
app.post('/insert', (request, response) => {
  const { fullname } = request.body;
  const results = insertName(fullname);
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});


// Read
app.get('/getTable', (request, response) => {
  const results = getTableData();
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Update



// Delete
app.delete('/delete/:ID', (request, response) => {
  const { ID } = request.params;
  console.log('ID fed to DB: ' + ID);
  const results = deleteUser(ID);
  results
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});



//--------------------------//
//      DB Functions        //
//--------------------------//

async function getTableData() {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM BBY7_user;';

      sessionConnection.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      })
    });
    return response;

  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(ID) {
  console.log('ID received by DB: ' + ID);
  try {
      ID = parseInt(ID, 10); 
      const response = await new Promise((resolve, reject) => {
          
          const query = "DELETE FROM BBY7_user WHERE ID = ?";

          sessionConnection.query(query, [ID] , (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
          })
      });
      return response === 1 ? true : false;
  } catch (err) {
      console.log(err);
      return false;
  }
}

// Start app, listen on port
app.listen(process.env.PORT || 8000, function() {
  console.log('App started on port ' + port);
});
