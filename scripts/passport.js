const LocalStrategy   = require('passport-local').Strategy;

const mysql = require('mysql2');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query('USE ' + dbconfig.database);
connection.end();

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        connection.connect();
        connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
        connection.end();
    });


    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            connection.connect();
            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, ('That email username is already taken.'));
                } else {
                    var newUserMysql = {
                        username: email,
                        password: bcrypt.hashSync(password, null, null) 
                    };

                    var insertQuery = "INSERT INTO user ( email, password ) values (?,?)";
                    connection.connect();
                    connection.query(insertQuery,[newUserMysql.email, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                    connection.end();
                }
            });
            connection.end();
        })
    );



    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.connect();
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, ('No user found.')); 
                }

               
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, ('loginMessage', 'Oops! Wrong password.'));


                return done(null, rows[0]);
            });
            connection.end();
        })
    );
};