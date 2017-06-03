var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// requiring the configuration Files
var mongoConfig = require('./config/mongodb.json');

// middleware for protected routes i.e (jwt token verification)
var verify = require('./middlewares/jwtverify');

// require the routes
var index = require('./routes/index');
var auth = require('./routes/auth');
var files = require('./routes/files');



var app = express();


// initialize mongoose.Promise to use promise in mongoose
mongoose.Promise = global.Promise;
// reference to ES6 promise implementation

// connect to mongodb
mongoose.connect(mongoConfig.url);
mongoose.connection
  .once('open', () => {
      console.log('Connected to MongoDB');
  }).
  on('error', (error) => {
    console.warn('Error', error);
  });



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// protected endpoints or routes
// these will require a jwt token for authentication
app.use('/api',verify);
app.use('/api/a', index);
app.use('/api/files', files);

// public routes
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
