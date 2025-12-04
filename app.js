var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
require('dotenv').config();

const { checkAuth } = require('./module/auth');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const databaseRouter = require('./routes/database');
const contactRouter = require('./routes/contact');
const messagesRouter = require('./routes/messages');
const adminRouter = require('./routes/admin');
const crudRouter = require('./routes/crud');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: new MySQLStore({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_USER,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.user = req.session?.user || null;
  next();
});

app.use('/app148/', indexRouter);
app.use('/app148/users', checkAuth, usersRouter);
app.use('/app148/register', registerRouter);
app.use('/app148/login', loginRouter);
app.use('/app148/database', databaseRouter);
app.use('/app148/contact', contactRouter);
app.use('/app148/messages', messagesRouter);
app.use('/app148/admin', adminRouter);
app.use('/app148/crud', crudRouter);

app.get('/app148/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.clearCookie('session_cookie_name');
    res.redirect('/app148/');
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
