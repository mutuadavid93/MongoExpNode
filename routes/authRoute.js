var express = require('express'),
        mongodb = require('mongodb').MongoClient,
        passport = require('passport'),
        authRouter = express.Router();
        
var router = function () {
   
   //Post Route
   authRouter.route('/signUp')
        .post(function(req, res) {
               console.log(req.body);
       
       //Add mongoDB
       var url = "mongodb://127.0.0.1:27017/libraryApp";
       mongodb.connect(url, function (err, db) {
           var collection = db.collection('users');
           var newuser = {
               username: req.body.userName,
               password: req.body.password
           };
           
           collection.insert(newuser, function (err, results) {
                //tell passport we are logged in
                req.login(results.ops[0], function () {
                     res.redirect('/auth/profile');        
               });       
          });
       }); //Connect
              
   });
   
   //SIgn In Route
   authRouter.route('/signin')
           .post(passport.authenticate('local', {
              failureRedirect: '/' 
   }), function (req, res) {
          res.redirect('/auth/profile');
   });
   
   //Profile Route
   authRouter.route('/profile')
        //Disallow direct page access if not logged in
        .all(function (req, res, next) {
            if(!req.user) {
                res.redirect('/');
            }
            next();
        })
   
        .get(function (req, res) {
            res.json(req.user); //logged in user info
         });
     
   return authRouter;
};

module.exports = router;