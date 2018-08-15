const fs = require('fs');
const ns = require('node-schedule');

const log = require('./logger');

const cj = require('cjson');
const config = cj.load('config.json');

const archive = require('./archive');

const util = require('./util');
const watch = require('./watch');
// fs.stat(config.source, (err, stat) => {
//   if(err)
//     log.error({Error: err});
//   log.info({filePathStatus: stat});
// });
var sched = util.generateSchedule(config.schedule);
watch.beginWatch(config.source);
ns.scheduleJob('0 0 10 * * * ',() => {
  util.ensureFolders(config.source, config.destination)
});
ns.scheduleJob('0 38 8 * * * ',() => {
    log.info({message: 'running archive operation'});
    archive.now(watch.getWatchFiles(), config.destination);
});
ns.scheduleJob('0 38 20 * * *', () => {
  log.info({message: 'Running Rotate Out Operation'});

});

log.info({message: 'App Has Launched Successfully'});
