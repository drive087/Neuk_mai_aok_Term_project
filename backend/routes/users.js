const express = require('express')
const mongoUtil = require('../mongoUtil')
const jwt = require('jsonwebtoken');

let userDb = mongoUtil.getUserDb()
const passport = require('passport')
let auth = require('../auth')
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10
});

const router = express.Router()

const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.send('Hello World')
})


router.post('/register', (req, res, next) => {
    const user = req.body

    userDb.collection('UserPersonal').findOne({email:user.email})
    .then((userRes) => {
        if(userRes != null){
            return res.status(400).json({
                errors:{
                    user: 'Email already used'
                }
            })
        }
        else{
            bcrypt.hash(user.password, saltRounds, function(err, hash) {
              // Store hash in your password DB.
              userDb.collection('UserPersonal').insertOne({
                email: user.email,
                password: hash,
                first_name: user.firstName,
                last_name: user.lastName,
                gender: user.gender,
                birthday: user.birthday
            })
            });
            console.log('create new user success!! >> ' + user.email)
        
            return res.status(200).json({
                sucess:'create success'
            })
        }
    })
  })

router.use('/user/login', apiLimiter)

//Case login
router.post('/login', auth.optional, (req, res, next) => {
    const user = req.body
    if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }
    
    if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }
        console.log(info)
        if(passportUser) {
          
            let user = passportUser;
            today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 60);
            let token = jwt.sign({
                email: user.email,
                id: user._id,
                exp: parseInt(expirationDate.getTime() / 1000, 10),
              }, 'secret')
            
            return res.json({ 
              user: {
                _id: user._id,
                username: user.email,
                token: token,
              }});
        }

        return res.status(400).json(info);
    })(req, res, next);
})


module.exports = router