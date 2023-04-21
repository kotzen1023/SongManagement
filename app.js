var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var mainRouter = require('./routes/main');
var uploadRouter = require('./routes/upload');
var editsongRouter = require('./routes/editsong');
var addsongRouter = require('./routes/addsong');
var deletesongRouter = require('./routes/deletesong');
var deleteAllRouter = require('./routes/deleteAll');

var app = express();

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({extended: false, limit: '50mb'}));
//app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);
app.use('/upload', uploadRouter);
app.use('/editsong', editsongRouter);
app.use('/addsong', addsongRouter);
app.use('/deletesong', deletesongRouter);
app.use('/deleteAll', deleteAllRouter);

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
