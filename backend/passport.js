const mongoUtil = require('./mongoUtil')
let database = mongoUtil.getUserDb()
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')

passport.use(new LocalStrategy(
  { // or whatever you want to use
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },
  (email, password, done)=>{
  database.collection('UserPersonal').findOne({email:email},(err,user)=>{
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
}));
// passport.serializeUser(database.collection('user').serializeUser());
// passport.deserializeUser(database.collection('user').deserializeUser());

module.exports.pp = function() {
  return passport;
}