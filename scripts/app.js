
module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/'); 
	});


	app.get('/login', function(req, res) {

		res.sendFile(__dirname + '/login.html');
	});


	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/login',
		}),
        function(req, res) {
            console.log("login log item");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });



	app.get('/profile', isLoggedIn, function(req, res) {
		res.sendFile(__dirname + '/landing.html', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {


	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}