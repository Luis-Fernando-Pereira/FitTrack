var express = require('express');
var app = express();

require('./otel');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./logger');
const methodOverride = require('method-override');
const logRequests = require('./middleware/loggerMiddleware');

var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var videoRouter = require('./routes/video');

app.use(logRequests);

app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});


// Middleware para logar todas as requisições
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Rota com erro
app.get('/error', (req, res, next) => {
  next(new Error('Erro de teste!'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err); // loga stacktrace
  res.status(500).json({ error: err.message });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//serve pasta javascript de maneira estática
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));


app.use('/',      indexRouter);
app.use('/admin', adminRouter);
app.use('/video', videoRouter);

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

app.use(express.static('javascript'));

module.exports = app;
