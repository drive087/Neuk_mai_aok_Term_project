const bcrypt = require("bcryptjs");
const logger = require("../log/logger");
const User = require("../models/userModel");

exports.signup = async (req, res, next) => {

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        pending: [],
        inprogress: [],
        cancel: [],
        approve: [],
        done: []
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user.email))
            .catch((err) => logger.error("SIGUN UP USER FAILED!"));
        });
      });
    }
  });
}
