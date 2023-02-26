var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql2 = require('mysql2/promise');

const conexion_mysql = require("./database")





//var sqlsess = require("express-mysql-session")
//var ex_sess = require("express-session")
var flash = require("connect-flash")
const passport = require("passport")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authrouter = require("./routes/auth")

var app = express();

//ARREGLANDO PROBLEMA EXPRESS-SESSION CON MYSQL2
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


require("./lib/passport")

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1234',
	database: 'fotos'
};


var connection = mysql2.createPool(options);
var sessionStore = new MySQLStore({}, connection);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));



// app.use(ex_sess({
//   secret: 'patata',
//   resave: false,
//   saveUninitialized: false,
//   store: new sqlsess(conexion_mysql)
// }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use( (req,res,next) =>{
  app.locals.success = req.flash("success")
  app.locals.message = req.flash("message")
  app.locals.user = req.user
  next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/",authrouter)

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
