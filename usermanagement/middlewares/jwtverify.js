var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// require jwt token secret
const jwtConfig = require('../config/jwt.json');

// middleware to authenticate the jwt token passed in the incoming request
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
   const token = req.body.token || req.query.token || req.headers['x-access-token'];
   // decode token
   if(token) {
     jwt.verify(token, jwtConfig.secret, function(err, decoded) {
       if(err) {
         return res.json({
           success: false,
           message: 'Failed to validate the token'
         });
       }
       else {
         req.user = decoded._doc.email;
         console.log(decoded);
         console.log(req.user);
         next();
       }
     });
   }
   else {
     // if no token is passes
     return res.status(403).send({
       success: false,
       message: 'No token was passed'
     });
   }
});

module.exports = router;
