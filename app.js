const express = require('express');
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const buildRouter = require('./routes/build');

const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

//!! if debug
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}));


app.use('/', indexRouter);
app.use('/build', buildRouter);
app.use(morgan('[:date] ":method :url" :status :response-time', { stream: process.stdout }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send("error");
});


module.exports = app;
