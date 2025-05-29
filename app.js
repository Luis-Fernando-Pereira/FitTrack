var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var treinoRouter =              require('./routes/admin/treino');
var indexRouter =               require('./routes/index');
var clienteRouter =             require('./routes/cliente');
var adminRouter =               require('./routes/admin');
var clienteCategoriasRouter =   require('./routes/categorias');
var exercicioRouter =           require('./routes/exercicio');
var comentariosRouter =         require('./routes/comentarios');
var categoriaExercicioRouter =  require('./routes/categoria_exercicio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',                    indexRouter);
app.use('/cliente',             clienteRouter);
app.use('/treino',              treinoRouter);
app.use('/admin',               adminRouter);
app.use('/categorias',          clienteCategoriasRouter);
app.use('/exercicios',          exercicioRouter);
app.use('/comentarios',         comentariosRouter);
app.use('/categoria-exercicio', categoriaExercicioRouter);

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
