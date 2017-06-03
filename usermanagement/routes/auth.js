var express = require('express');
var router = express.Router();
// used to create,sign and verify a token
var jwt = require('jsonwebtoken');
// require the user model
const User = require('../models/user');
// require jwt secret from config
const jwtConfig = require('../config/jwt.json');
// Route to check whether a user already exists or Not

router.get('/isemailunique/:email', function(req, res) {
  User.findOne({
    email: req.params.email
  }).
  then((user) => {
    res.json({
      success: user ? true : false,
      message: user ? 'User already exists' : 'User email is unique'
    });
  }).
  catch((error) => res.status(500).send(err));
});


// Route to register a new user

router.post('/register', function(req, res) {
  // create a new user object
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  // save it to mongodb
  user.save()
    .then(() => {
      res.json({
        success: true,
        message: 'User successfully created'
      });
    }).
  catch((err) => {
    res.status('500').
    send({
      success: false,
      message: (err.code === 11000) ? 'Email already exists' : err
    });
  });
});

// Route to authenticate a user
router.post('/authenticate', function(req, res) {
  // find a user in mongodb
  console.log(req.body)
  User.findOne({
    email: req.body.email
  }).
  then((user) => {
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found'
      });
    } else {
      // check if user password matches
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed, Incorrect password'
        });
      } else {
        // is user is found and password is right
        // create a jwt token
        const token = jwt.sign(user, jwtConfig.secret, {
          expiresIn: '1440m' // expires in 24 hours (24*60 = 1440 min)
        });
        // return the response  with token
        res.json({
          success: true,
          message: 'user is authenticated',
          token: token
        });
      }
    }
  }).
  catch((err) => {
    // should be replaced with a user defined error message later on
    res.status('500').send(err);
  })
});

module.exports = router;
