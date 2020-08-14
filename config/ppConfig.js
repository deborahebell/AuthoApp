const passport = require('passport'); //initialize
const localStrategy = require('passport-local').Strategy;
const db = require('../models'); //database

/* Passport "serialize" your info make it easier to login
Conver to user based on the id
 */


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
//passport deserializer is going to take the id and look that 
//up in the database

passport.deserializeUser((id, cb) => {
    //cb(null, user.id);
    //.catch(cb);
});

    db.user.findByPK(id)
    .then(user => {
        cb(null, user)
    }).catch(cb);

});

//this is Middleware
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password), cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            db(null, false);
        } else {
            cb(null, user);
        }
    })
    .catch(cb);
}));

module.exports = passport;