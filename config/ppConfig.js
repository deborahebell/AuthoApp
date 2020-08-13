const passport = require('passport'); //initialize
const localStrategy = require('passport-local').Strategy;
const db = require('../models'); //database

/* Passport "serialize" your info make it easier to login
Conver to user based on the id
 */


passport.serializeUser((user, cb) => {
    cb(null, user.id);
    .catch(cb());
});

//this is Middleware
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password), cb) => {
    sb.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            db(null, false);
        } else {
            cb(null, user);
        }
    })
    .catch(cb());
}));

module.exports = passport;