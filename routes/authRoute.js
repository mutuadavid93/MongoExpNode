var express = require('express'),
        mongodb = require('mongodb').MongoClient;
        authRouter = express.Router();
        
var router = function () {
   
   //Post Route
   authRouter.route('/signUp')
        .post(function(req, res) {
               console.log(req.body);
       //Now login
       req.login(req.body, function () {
            res.redirect('/auth/profile');        
      });
   });
   
   //Profile Route
   authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
         });
     
   return authRouter;
};

module.exports = router;