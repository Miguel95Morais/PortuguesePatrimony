var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var utilizadorRouter = require('./routes/utilizadorRoutes');
var monumentoRouter = require('./routes/monumentoRoutes');
var reservaRouter = require('./routes/reservaRoutes');
var guiaRouter = require('./routes/guiaRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/utilizadores', utilizadorRouter);
app.use('/monumentos', monumentoRouter);
app.use('/reservas', reservaRouter);
app.use('/guias', guiaRouter);

module.exports = app;
