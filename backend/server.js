const express = require('express')
const mongoUtil = require('./mongoUtil')
const session = require('express-session')
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;

console.log("Start server")

mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  const passport = require('./passport').pp()
  const userRouter = require('./routes/users')
  const app = express()
  
  app.use(cors({
      origin:['http://localhost:3000'],
      credentials:true
  }));
  
  app.use(express.json())
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(session({
    secret: 'qve~UV20_0',
    resave: false,
    saveUninitialized: false
  }));

  // passport middleware setup ( it is mandatory to put it after session middleware setup)
  app.use(passport.initialize());
  app.use(passport.session());

//   app.use('/', doctorRouter)
  app.use('/user', userRouter)
  app.listen(8080, () => console.log('server started'))
} );
