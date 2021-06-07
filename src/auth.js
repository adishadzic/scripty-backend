const User = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: 'User added successfully!',
        });
      })
      .catch((error) => {
        res.json({
          message: 'Error occured!',
        });
      });
  });
};

const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ $or: [{ email: username }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            {
              name: user.name,
            },
            'verySecretValue',
            { expiresIn: '2h' }
          );
          res.json({
            message: 'Login successful',
            token,
          });
        } else {
          res.json({
            message: 'Passwords dont match',
          });
        }
      });
    } else {
      res.json({
        message: 'User was not found',
      });
    }
  });
};

module.exports = { register, login };
