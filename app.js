var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mascotasRouter = require('./routes/mascotas');
var veterinariosRouter = require('./routes/veterinarios');
var citasRouter = require('./routes/citas');
var cors = require('cors')
var app = express();
const PORT = process.env.PORT || 3000; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mascotas', mascotasRouter);
app.use('/veterinarios', veterinariosRouter);
app.use('/citas', citasRouter);


module.exports = app;
