const logger = require('bunyan');
const bformat = require('bunyan-format');

var formatOut = bformat({outputMode: 'long'});
var log = logger.createLogger({
  name: 'BakRoller',
  level: 'debug',
  serializers: logger.stdSerializers,
  streams: [{
    type: 'rotating-file',
    path: 'logs/access.log',
    period: '2d',
    count: 10
  },{
    stream: formatOut
  }]
});

module.exports = log;
