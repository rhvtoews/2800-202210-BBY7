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
// const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');

const twoHours = 1000 * 60 * 60 * 2;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('./'));
app.use(cookieParser());


app.use(session ({
  key: 'keyin',
  secret: 'secret0982348934',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: twoHours }
}));

var sess;
var loggedIn = false;
var isAdmin = false;

// DB Location constants
const is_heroku = process.env.IS_HEROKU || false;
const port = process.env.PORT || 8000;

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

// var sessionData = new MySQLStore({
//   expiration: 10800000,
//   createDatabaseTable: true,
//   schema:{
//     tableName: 'sessiontbl',
//     columnNames:{
//       session_id: 'session_id',
//       expires: 'expires',
//       data: 'data'
//     }
//   }
// });

// Supply index page
app.get('/', function(req, res) {
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/landing.html');
  }
});

// Supply profile page
app.get('/profile', function(req,res) {
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/profile.html');
  }
});

// Supply landing page
app.get('/landing', function(req, res) {
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/landing.html');
  }
});


// Supply dashboard page
app.get('/dashboard', function(req, res) {
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/dashboard.html');
  }
  
});

// Supply register page
app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/html/register.html');
});

// Supply about page
app.get('/about', function(req, res) {
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/about.html');
  }
  
});

// Supply account admin page
app.get('/admin', function(req, res) {  
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/admin.html');
  } 
});

// Plants page
app.get('/plantscards', function(req, res) {  
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/html/plantscards.html');
  } 
});

// Easter Egg
app.get('/surprise', function(req, res) {  
  if (!loggedIn) {
    res.sendFile(__dirname + '/html/index.html');
  } else {
    res.sendFile(__dirname + '/LandingPage/first.html');
  } 
});

// Logout, then route to index
app.get('/logout', function(req,res){
  req.session.destroy(function(err){
      if(!err){
        loggedIn = false;
        res.redirect('/');
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
        loggedIn = true;
        sess.email = req.body.email;
        res.redirect('/landing');
      } else {
        res.redirect('/');
      }
    }
    )
});


//--------------------------//
//      CRUD Functions      //
//--------------------------//

//---- Create ----//

// Account signup code
app.post('/signup', function(req, res, next) {
  
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var region = req.body.region;
  

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, region, plantCounter, admin) VALUES (?, ?, ?, ?, ?, ?)',
    [fullname, email, password, region, 0, false]);
    res.sendFile(__dirname + '/html/index.html');

});

// Account creation for admin
app.post('/adminCreate', function(req, res, next) {
  
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var region = req.body.city;

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, city, plantCounter, admin) VALUES (?, ?, ?, ?, ?, ?)',
    [fullname, email, password, region, 0, false]);
    res.redirect('/Dashboard/dashboard');
});


//---- Read ----//

// Gets BBY7_user data
app.get('/getTable', (request, response) => {
  const results = getTableData();
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

//gets BBY7_plant data
app.get('/getPlants', (request, response) => {
  const results = getPlantTableData();
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Gets user id of logged in user
app.get('/getUser', (request, response) => {
  const results = getUserData(sess.email);
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});



//---- Update ----//

// Changes name
app.post('/changeName', function(req, res, next) {
  const fullname = req.body.fullname;
  const email = sess.email;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.fullname = ? WHERE BBY7_user.email = ?',
  [fullname, email], function(err, results, fields){})
});

// Changes email
app.post('/changeEmail', function(req, res, next) {
  const email = sess.email;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.email = ? WHERE BBY7_user.email = ?',
  [email, email], function(err, results, fields){})
});

// Changes password
app.post('/changePassword', function(req, res, next) {
  const password = req.body.password;
  const email = sess.email;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.password = ? WHERE BBY7_user.email = ?',
  [password, email], function(err, results, fields){})
});

// Changes region
app.post('/changeRegion', function(req, res, next) {
  const region = req.body.region;
  const email = sess.email;
  sessionConnection.query('UPDATE BBY7_user SET BBY7_user.region = ? WHERE BBY7_user.email = ?',
  [region, email], function(err, results, fields){})
});


//---- Delete ----//

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

async function getPlantTableData() {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM BBY7_plant;';

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

async function getUserData(email) {
  try {
    const response = await new Promise((resolve, reject) => {
        
        const query = "SELECT * FROM BBY7_user WHERE email = ?";

        sessionConnection.query(query, [email] , (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
    });
    return response;
} catch (err) {
    console.log(err);
    return false;
}
}

// Start app, listen on port
app.listen(process.env.PORT || 8000, function() {
  console.log('App started on port ' + port);
});
