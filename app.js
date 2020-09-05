
const express = require('express');
//const cors = require('cors')

const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const buildRouter = require('./routes/build');


const app = express();


app.use(logger('dev'));
//app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/build', buildRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
