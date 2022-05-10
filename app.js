"use strict";
const express = require('express');
const session = require('express-session');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// const POST = process.env.PORT || 8000;


//dummy account
const userData = {
  fullname: "Ryan Toews",
  username: "ryant",
  password: 12345
}

var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'BBY7_members'
}

var sessionConnection = mysql.createConnection(options);
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

app.use(session ({
  key: 'keyin',
  secret: 'secret0982348934',
  strore: sessionData,
  resave: false,
  saveUninitialized: true
}))

app.use('/login', function(req, res) {
  const { username , password } = req.body
  if (username != userData.username || password != userData.password) {
    return res.status(401).json({
      error: true,
      message: "Invalid Username or Password"
    })
  } else {
    req.session.userinfo = userData.fullname
    res.send("Login successful")
  }
})

app.use('/logout', function(req,res){
  req.session.destroy(function(err){
      if(!err){
          res.send("Logged Out")
      }
  })
})

app.use('/', function(req, res) {
  if(req.session.userinfo) {
    res.send("Welcome" + req.session.userinfo)
  } else {
    res.send("Please log in")
  }
})



// var thisSession;

// router.get('/', (req, res) => {
//   thisSession = req.session;
//   if (thisSession.username) {
//     return res.redirect('/admin');
//   }
//   res.sendFile('index.html')
// })

// app.use(session({
//   secret: "secret234234key234324token690848064",
//   saveUninitialized: true,
//   resave: false
// }));

// router.post('/login', (req, res) => {
//   thisSession = req.session;
//   thisSession.username = req.body.username;
//   res.end('done');
// })

// app.get('/', function(req, res){
//   thisSession =  req.session;
//   thisSession.username;
//   thisSession.password;
// });

// router.get('/admin', (req, res) => {
//   thisSession = req.session;
//   if (thisSession.username) {
//     res.write('<h1>Hello ${thisSession.username} <h1><br>');
//     res.end('+', 'Logout');
//   } else {
//     res.write('Please login first.');
//   }
// });

// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return console.log(err);
//     }
//     res.redirect('/');
//   });
// });

// app.use('/', router);

app.listen(process.env.PORT || 8000, () => {
  console.log('App started on port ' + port);
});

