const winston = require('winston');

const log = winston.createLogger({
  level: 'debug',
  format: winston.format.combine( winston.format.splat(), winston.format.simple() ),
  transports: [ new winston.transports.Console()],
});

module.exports = log;
