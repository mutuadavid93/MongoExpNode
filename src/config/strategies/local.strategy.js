var passport = require('passport'),
        mongodb = require('mongodb').MongoClient,
        LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    //configure new local startegy
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    
    //login(), Determine whether it's an appropriate sign in
    function (username, password, done) {
       var url = "mongodb://127.0.0.1:27017/libraryApp";
        
       mongodb.connect(url, function (err, db) {
           var collection = db.collection('users');
           collection.findOne({ username: username }, function (err, results) {
               if(results.password === password) {
                    var user = results;
                     done(null, user); //callback
               }else {
                   //Redirect to '/'
                   done(null, false, { message: 'Bad Password!' });
               }
         });
       });
    }));
};