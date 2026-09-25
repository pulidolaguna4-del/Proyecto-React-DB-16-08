var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const db = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var routeClientes = require('./routes/clientes');
var routeProductos = require('./routes/productos');
var routeVentas = require('./routes/ventas');

var app = express();

db.query('SELECT 1')
  .then(() => console.log('Conexión a MySQL establecida'))
  .catch(err => console.error('Error al conectar con MySQL:', err.message));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clientes', routeClientes);
app.use('/productos', routeProductos);
app.use('/ventas', routeVentas);

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
