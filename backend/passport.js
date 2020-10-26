const mongoUtil = require('./mongoUtil')
let database = mongoUtil.getUserDb()
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  { // or whatever you want to use
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },
  (email, password, done) => {
    database.collection('UserPersonal').findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect EMAIL <<Email: ' + email + '>>' });
      }
      bcrypt.compare(password, user.password,  (err, match) => {
        if (err) {
          return done(err);
        }
        if (match == false) {
          return done(null, false, { message: 'Incorrect PASSWORD <<Email: ' + email + '>>' });
        }else{
          return done(null, user);
        }
      });
      
    })
  }));
// passport.serializeUser(database.collection('user').serializeUser());
// passport.deserializeUser(database.collection('user').deserializeUser());

module.exports.pp = function () {
  return passport;
}