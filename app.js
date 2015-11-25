'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');

// setup route middlewares 
var csrfProtection = csrf();
var parseForm = bodyParser.urlencoded({ extended: false });

var app = module.exports = express();

var router = {}; 
router.index = require('./routes/index');
router.login = require('./routes/login');
router.add = require('./routes/add');
router.logout = require('./routes/logout');
router.sendedMail = require('./routes/sendedMail');
router.authMail = require('./routes/authMail');
//セッション準備

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// app.use(express.session({
//     secret: 'secret',
//     store: new MongoStore({
//         db: 'session',
//         host: 'localhost',
//         clear_interval: 60 * 60
//     }),
//     cookie: {
//         httpOnly: false,
//         maxAge: new Date(Date.now() + 60 * 60 * 1000)
//     }
// })); 

var settings = require('./settings');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: settings.common.sessionSecret,
    resave:true,
    saveUninitialized: false,
    store: new MongoStore({
        // db:'sample-login',
        // host:'localhost',
        db:settings.common.dbName,
        host:settings.common.dbHost,
        clear_interval:60 * 60
        // ttl: 1 * 1 * 60 * 60 // = 14 days. Default
        // ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    cookie: {
        httpOnly: false,
        maxAge: new Date(Date.now() + 60 * 60 * 1000)
 //       maxAge: 60 * 60 * 1000 // クッキーの有効期限(msec)
    }
}));

//ルーティング指定
app.use('/', router.index);
app.use('/login', router.login);
app.use('/add', router.add);
app.use('/logout', router.logout);
app.use('/sendedMail', router.sendedMail);
app.use('/authMail', router.authMail);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(3001);