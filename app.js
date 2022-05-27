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
const { response } = require('express');
const multer = require('multer');

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



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./Image/profile")
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });



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

// // Supply account admin page
// app.get('/admin', function(req, res) {  
//   if (!loggedIn) {
//     res.sendFile(__dirname + '/html/index.html');
//   } else {
//     res.sendFile(__dirname + '/html/admin.html');
//   } 
// });

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
        // loggedIn = false;
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
  // console.log(email);
  // checkAdmin(email).then((value) => {
  //   console.log(value);
  // })
  // console.log(isAdmin);
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
  var image = "/placeholder.png";
  

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, region, plantCounter, admin, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [fullname, email, password, region, 0, false, image]
  );
  
  res.sendFile(__dirname + '/html/index.html');

});

// Account creation for admin
app.post('/adminCreate', function(req, res, next) {
  
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var region = req.body.region;
  var image = "/placeholder.png";

  sessionConnection.query(
    'INSERT into BBY7_user (fullname, email, password, region, plantCounter, admin, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [fullname, email, password, region, 0, false, image]);
    res.redirect('/dashboard');
});


//---- Read ----//

// Gets BBY7_user data
app.get('/getTable', (request, response) => {
  const results = getTableData();
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Gets BBY7_plant data
app.get('/getPlants', (request, response) => {
  const results = getPlantTableData();
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Gets user data of logged in user
app.get('/getUser', (request, response) => {
  const results = getUserData(sess.email);
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Gets plants added to timeline
app.get('/getTimeline', (request, response) => {
  const results = getUserPlants(sess.email);
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});


//---- Update ----//

// Changes name
app.post('/changeName', function(request, response, next) {
  var fullname = request.body.fullname;
  const email = sess.email;
  updateName(fullname, email);
  response.sendFile(__dirname + '/html/profile.html');
});

app.post('/adminChgName', function(request, response, next) {
  var fullname = request.body.fullname;
  var ID = request.body.ID;
  adminUpdateName(fullname, ID);
  response.sendFile(__dirname + '/html/dashboard.html');
});

// Changes email
app.post('/changeEmail', function(request, response, next) {
  var newEmail = request.body.email;
  const email = sess.email;
  updateEmail(newEmail, email);
  response.sendFile(__dirname + '/html/profile.html');
});

app.post('/adminChgEmail', function(request, response, next) {
  var email = request.body.email;
  var ID = request.body.ID;
  adminUpdateEmail(email, ID);
  response.sendFile(__dirname + '/html/dashboard.html');
});

// Changes password
app.post('/changePassword', function(request, response, next) {
  var password = request.body.password;
  const email = sess.email;
  updatePassword(password, email);
  response.sendFile(__dirname + '/html/profile.html');
});

app.post('/adminChgEmail', function(request, response, next) {
  var password = request.body.password;
  var ID = request.body.ID;
  adminUpdatePassword(password, ID);
  response.sendFile(__dirname + '/html/dashboard.html');
});


// Changes region
app.post('/changeRegion', function(request, response, next) {
  var region = request.body.region;
  const email = sess.email;
  updateRegion(region, email);
  response.sendFile(__dirname + '/html/profile.html');
});

app.post('/adminChgRegion', function(request, response, next) {
  var region = request.body.region;
  var ID = request.body.ID;
  adminUpdateRegion(region, ID);
  response.sendFile(__dirname + '/html/dashboard.html');
});

// Toggles admin status
app.get('/makeAdmin/:ID', (request, response) => {
  const { ID } = request.params;
  const results = toggleAdmin(ID);
  results
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});

// Adds a plant to the user's timeline and increments their plant counter
app.post('/addPlant/:plant', function(request, response, next){
  var plant = request.params;
  console.log(plant);
  var email = sess.email;
  updateMyPlants(plant, email);
  updateCounter(email);
  response.sendFile(__dirname + '/html/plantscards.html');
});

// Uploads files
app.post('/upload', upload.single("userPhoto"), function (request, response) {

  var Filename = request.file.filename;
  var email = sess.email;
  updateProfilePhoto(Filename, email);
  response.sendFile(__dirname + '/html/profile.html');
});

// Uploads files
app.post('/adminUpload', upload.single("userPhoto"), function (request, response) {

  var Filename = request.file.filename;
  var email = sess.email;
  updateProfilePhoto(Filename, email);
  response.sendFile(__dirname + '/html/profile.html');
});



//---- Delete ----//

app.delete('/delete/:ID', (request, response) => {
  const { ID } = request.params;
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

async function toggleAdmin(ID) {
  try {
      ID = parseInt(ID, 10); 
      const response = await new Promise((resolve, reject) => {
          
          const query = "UPDATE BBY7_user SET BBY7_user.admin = NOT(BBY7_user.admin) WHERE BBY7_user.ID = ?";

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

// async function checkAdmin(email) {
//   try {
//       const response = await new Promise((resolve, reject) => {
          
//           const query = "SELECT ID FROM BBY7_user WHERE (email = ? AND admin = true)";
//           console.log(email);
//           sessionConnection.query(query, [email] , (err, results) => {
//               if (err) reject(new Error(err.message));
//               console.log(results.length);
//               resolve(results);
//           })
//       });
//       return response === 1 ? true : false;
//   } catch (err) {
//       console.log(err);
//       return false;
//   }
// }

async function deleteUser(ID) {
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

async function updateName(fullname, email) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.fullname = ? WHERE BBY7_user.email = ?";

      sessionConnection.query(query, [fullname, email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.affectedRows);
      })
    });
    return response === 1 ? true : false;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function adminUpdateName(fullname, ID) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.fullname = ? WHERE BBY7_user.ID = ?";

      sessionConnection.query(query, [fullname, ID], (err, results) => {
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



async function updateEmail(newEmail, email) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.email = ? WHERE BBY7_user.email = ?";

      sessionConnection.query(query, [newEmail, email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.affectedRows);
      })
    });
    return response;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function adminUpdateEmail(email, ID) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.email = ? WHERE BBY7_user.ID = ?";

      sessionConnection.query(query, [email, ID], (err, results) => {
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

async function updatePassword(password, email) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.password = ? WHERE BBY7_user.email = ?";

      sessionConnection.query(query, [password, email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.affectedRows);
      })
    });
    return response;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function adminUpdatePassword(password, ID) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.password = ? WHERE BBY7_user.ID = ?";

      sessionConnection.query(query, [password, ID], (err, results) => {
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

async function updateRegion(region, email) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.region = ? WHERE BBY7_user.email = ?";

      sessionConnection.query(query, [region, email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.affectedRows);
      })
    });
    return response;
  } catch (err) {
      console.log(err);
      return false;
  }
}

async function adminUpdateRegion(region, ID) {
  try {
    const response = await new Promise((resolve, reject) => {
    
      const query = "UPDATE BBY7_user SET BBY7_user.region = ? WHERE BBY7_user.ID = ?";

      sessionConnection.query(query, [region, ID], (err, results) => {
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

async function getUserPlants(email) {
  try {
    const response = await new Promise((resolve, reject) => {
        
        const query = "SELECT * FROM BBY7_myplantlist WHERE email = ?";

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

async function updateCounter(email){
  try{
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE BBY7_user SET BBY7_user.plantCounter = (BBY7_user.plantCounter + 1) WHERE BBY7_user.email = ?";
      sessionConnection.query(query, [email], (err, results) => {
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

async function updateMyPlants(pName, email){
  var newPlant = pName.plant.toString();
  var d = new Date();
  console.log(d);
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "INSERT INTO BBY7_myplantlist (pName, email, cardTime) VALUES (?, ?, ?)";
      sessionConnection.query(query, [newPlant, email, d], (err, results) => {
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

async function updateProfilePhoto(Filename, email) {
  var location = ("/" + Filename.toString());
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE BBY7_user SET BBY7_user.image = ? WHERE BBY7_user.email = ?";
      sessionConnection.query(query, [location, email], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results.affectedRows);
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
