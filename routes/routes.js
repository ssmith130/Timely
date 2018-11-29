const router = require('express').Router();
const Mongo = require('../mongo.js');
let bcrypt = require('bcrypt');
let db = new Mongo();
const isAuthenticated = function (req, res, next) {
    db.verifyToken(req.headers['x-access-token']).then(next)
                                .catch(() => res.redirect('./index.html'));
};
const path = require('path');

module.exports = function(){
  router.post('/signup', function(req, res){
    console.log(req.body);
    const { email, first_name, last_name, password } = req.body;
    db.signup(email, first_name, last_name, password).then(()=>{
      res.send('Account Created')
    });
  }),

  router.post('/login', function(req, res){
    console.log(req.body);
    const { email, password } = req.body;
    db.login(email, password).then(()=>{
      res.redirect('/assignments')
    }).catch(()=>{
      res.redirect('./index.html')
    });
  }),
  router.get('/super-secret-info', isAuthenticated, function(req, res) {
        //if isAuthenticated calls next(), the request proceeds here
  });
  router.get('/assignments', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html','assignments.html'));
  });
  router.get('/about', isAuthenticated, function(req, res) {
    res.sendFile('./about.html');
  });
  router.get('/classes', isAuthenticated, function(req, res) {
    res.sendFile('./classes.html');
  });
  router.get('/profile', isAuthenticated, function(req, res) {
    res.sendFile('profile.html');
  });
  router.get('/', function(req, res){
    //console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/html','index.html'));
  })
  return router;
}
