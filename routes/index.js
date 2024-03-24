var express = require('express');
var router = express.Router();

const users=['sam'];
const pass = ['sam'];


router.get('/', function(req, res, next) {
  if(req.session.user){
    return res.render('phantom',{login:req.session.user});  
  }
  res.render('phantom',{login:"NULL"});
  console.log(users,pass);
});


router.get('/login',function(req,res){
  res.render('login',{message:null});
});

router.get('/signup',function(req,res){
  res.render('signup',{message:null});
});

router.post('/signup',function(req,res){
  let username = req.body.user;
  let password = req.body.pass;
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i] === username) {
      userIndex = i;
      break;
    }
  };
  if(userIndex == -1){
    users.push(username);
    pass.push(password);
    console.log(users,pass);
    req.session.user=username;
    return res.redirect('/');
  }
  else{
    return res.render('signup',{message:"Username already exists"})
  }
})

router.post('/login', function(req, res) {
  let username = req.body.user;
  let password = req.body.pass;
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i] === username) {
      userIndex = i;
      break;
    }
  }
  if (userIndex !== -1) {
    console.log(password);
    if (pass[userIndex] == password) {
      req.session.user=username;
      return res.redirect('/');
    } else {
      console.log("incorrect password");
      return res.render('login',{message:"Invalid username or password"});
    }
  }
  else {
    console.log("incorrect username");
    return res.render('login',{message:"Invalid username or password"});
  }
});


module.exports = router;
