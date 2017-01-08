var passport = require('passport');

//Declare (app) function
module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    //add user to session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    //pull user from db using the session
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    //import passport-local stuff
    require('./strategies/local.strategy')();
};