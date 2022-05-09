const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const day = 1000 * 60 * 60 * 24;

app.use(session({
  secret: "secret234234key234324token690848064",
  saveUninitialized: true,
  cookie: { invalidTime : day },
  resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

const username = 'testUser'
const password = 'test1234'

var thisSession;

app.get('/', (req, res) => {
  thisSession = req.thisSession;
  if (thisSession.userid) {
    res.send("Welcome <a href=\'/logout'>Click to Logout</a>");
  } else {
    res.sendFile('/index.html',{root: __dirname})
  }
});

app.post('/user', (req,res) => {
  if(req.body.username == username && req.body.password == password){
      thisSession=req.thisSession;
      thisSession.userid=req.body.username;
      console.log(req.thisSession)
      res.send("Welcome <a href=\'/logout'>Click to Logout</a>");
  }
  else{
      res.send('Invalid username or password');
  }
});

app.get('/logout', (req, res) => {
  req.thisSession.destroy();
  res.redirect('/');
});

app.listen(port, () => console.log('Server Running on ' + port));

