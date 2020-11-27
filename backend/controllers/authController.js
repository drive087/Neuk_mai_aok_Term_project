const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../models/userModel");
exports.login = async (req, res, next) => {
  const user = req.body;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  User.find({}).then((user) => {
    console.log(user)
  })
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user._id,
          username: user.email,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            // expiresIn: 31556926, // 1 year in seconds
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              "user": {
                "_id": user._id,
                "username": user.email,
                "token": "Bearer " + token,
            }});
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};
