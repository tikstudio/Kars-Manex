const express = require("express");
const app = express();
const fs = require("fs");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");
const compression = require("compression");

const serverHost = require("./middlewares/serverHost");
const headers = require("./middlewares/headers");
const authorization = require("./middlewares/authorization");

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const log = fs.createWriteStream('error.log', {flags: 'a'});
app.use(morgan('combined', {stream: log}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(headers);
app.use(serverHost);
app.use(authorization);
app.enable("trust proxy");

app.use("/", require('./router/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
});

module.exports = app;
