const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : ' ' //Fill in the database
});

const app = express();

app.use(session({
	secret: 'BBY-7',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'script')));


app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});


app.post('/auth', function(request, response) {
	
	let username = request.body.username;
	let password = request.body.passw;
	
	if (username && password) {
		
		connection.query('SELECT * FROM accounts WHERE username = ? AND passw = ?', [username, password], function(error, results, fields) {
		
			if (error) throw error;
			
			if (results.length > 0) {
				
				request.session.loggedin = true;
				request.session.username = username;
				
				response.redirect('/home');
			} else {
				response.send('Unvalid Username OR Password!');
			}			
			response.end();
		});
	} else {
		response.send('Enter Username and password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	
	if (request.session.loggedin) {
		
		response.send('Welcome to SeedIt again, ' + request.session.username + '!');
	} else {
		
		response.send('Login required to access this page!');
	}
	response.end();
});

app.listen(3000);