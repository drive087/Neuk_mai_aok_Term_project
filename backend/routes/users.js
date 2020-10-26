const express = require('express')
const mongoUtil = require('../mongoUtil')
const jwt = require('jsonwebtoken');

let userDb = mongoUtil.getUserDb()

const passport = require('passport')

let auth = require('../auth')

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

router.get('/login', auth.required, (req, res, next) => {
  
  let token = null;
  console.log('get login')
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Token') {
    token =  authorization.split(' ')[1];
    var user = jwt.verify(token, 'secret');

    return res.status(200).json({ 
      user: {
        _id: user.id,
        username: user.email,
      }});
  }
  else {
    return res.status(400).json({ 
      user: {
        status: 'pls login first'
      }});
  }
})

// //Case login
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


// //Case getallpatients
// router.get('/:_id/getpatients', auth.required, (req, res, next) => {
//     const doctor = req.params;
//     console.log(patientDb.collection('user'))
    

//     patientDb.collection('user').find({doctor:doctor._id}).toArray()
//     .then((patients) => {
//       if(!patients) {
//         return res.sendStatus(400);
//       }
//       let patientArray = []
//       patients.forEach(patient => {
//         patientArray.push(patient)
//       });


//       return res.json(patientArray);
//     });

    
// })

module.exports = router