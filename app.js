const fs = require('fs');
const ns = require('node-schedule');

const log = require('./logger');

const cj = require('cjson');
const config = cj.load('config.json');

const archive = require('./archive');

const util = require('./util');
const watch = require('./watch');

// TODO: Modify the Config to house an array of locations to backup.
// TODO: Allow iteration over scheduled jobs.
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
ns.scheduleJob('0 18 15 * * * ',() => {
    log.info({message: 'running archive operation'});
    archive.now(watch.getWatchFiles(), config.destination);
});

log.info({message: 'App Has Launched Successfully'});
