var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
const CONTEXT_PATH = process.env.CONTEXT_PATH || '';

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-fallback-secret-key', // REQUIRED: A secret string for signing the session ID cookie. USE ENV VARIABLE IN PRODUCTION!
    resave: false,               // Prevents session from being saved back to the session store, even if it was never modified.
    saveUninitialized: false,    // Prevents uninitialized sessions from being saved to the store.
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 1 day in milliseconds
    }
}));

app.use('/app148/', indexRouter);
app.use('/app148/users', usersRouter);
app.use('/app148/login', loginRouter);
app.use('/app148/register', registerRouter);
app.use('/app148/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
