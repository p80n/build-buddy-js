const winston = require('winston');

const log = winston.createLogger({
  level: 'debug',
  format: winston.format.prettyPrint(),
  transports: [ new winston.transports.Console()],
});

module.exports = log;
