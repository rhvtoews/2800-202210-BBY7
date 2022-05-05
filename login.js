const express = require('express');
const app = express();
app.use(express.json());
const session = require('express-session');
const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');
const { connect } = require('http2');
const { JSDOM } = require('jsdom');




app.use(session({
	name: "login",
	secret: 'BBY-7',
	resave: true,
	saveUninitialized: true
}));

/*
* const port = 3000;
* const fs = require("fs");
* const bodyParser = require("body-parser");
* const router = express.Router();
* var mysql = require("mysql");
* const cookieSession = require("cookie-session");
*/

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'script')));


app.get('/', function(request, response) {

	if (request.session.loggedIn) {
		response.redirect("/profile");
	} else {
		let doc = fs.readFileSync("./login.html", "utf8");
		response.send(doc);
	}
});

app.get("/profile", function(request, response) {
	if(request.session.loggedIn) {
		const mysql = require('mysql2');
		const connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'members' //The database
		});
		connection.connect();
		//Space for initial data query to fill the profile info on the user's
		//profile page
		connection.end();
	} else {
			response.redirect("/")
	}
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', function(request, response) {

	res.setHeader("Content-Type", "application/json");
	console.log("User info returned", request.body.email, request.body.password);


	// let username = request.body.email;
	// let password = request.body.password;
	
	// if (username && password) {
		
	// 	connection.query('SELECT * FROM accounts WHERE username = ? AND passw = ?', [username, password], function(error, results, fields) {
		
	// 		if (error) throw error;
			
	// 		if (results.length > 0) {
				
	// 			request.session.loggedin = true;
	// 			request.session.username = username;
				
	// 			response.redirect('/home');
	// 		} else {
	// 			response.send('Unvalid Username OR Password!');
	// 		}			
	// 		response.end();
	// 	});
	// } else {
	// 	response.send('Enter Username and password!');
	// 	response.end();
	// }

	let record = authenticate(request.body.email, request.body.password,
		function(userRecord) {
			if(userRecord == null) {
				response.send({ status: "fail", msg: "User not found" });
			} else {
				request.session.loggedIn = true;
				request.session.email = userRecord.email;
				request.session.firstName = userRecord.firstName;
				request.session.lastName = userRecord.lastName;
				request.session.password = userRecord.password;
				request.session.city = userRecord.city;
				request.session.birthDate = userRecord.birthDate;
				request.session.admin = userRecord.admin;			
				response.send({ status: "pass", msg: "Login successful"});
			}
		});

});

app.get('/home', function(request, response) {
	
	if (request.session.loggedin) {
		
		response.send('Welcome to SeedIt again, ' + request.session.email + '!');
	} else {
		
		response.send('Login required to access this page!');
	}
	response.end();
});

app.get("/logout", function(req,res){
	if (req.session) {
			req.session.destroy(function(error) {
					if (error) {
							res.status(400).send("Cannot log out")
					} else {
							res.redirect("/");
					}
			});
	}
});

function authenticate(email, password, callback) {
	const mysql = require('mysql2');
	const connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'members'
	});
		
	connection.connect();
	connection.query(
		
		"SELECT * FROM user WHERE email = ? AND password = ?", [email, password],
		function(error, results) {
				
				console.log("Results from DB", results, "and the # of records returned", results.length);

				if (error) {
						
						console.log(error);
				}
				if(results.length > 0) {
						return callback(results[0]);
				} else {
						return callback(null);
				}

		}
	);

}

async function init() {

   
	const mysql = require("mysql2/promise");
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		multipleStatements: true
	});

 
	
	console.log("Listening on port " + port + "!");
}


let port = 8000;
app.listen(port, init);