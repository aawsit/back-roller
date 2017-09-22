const ck = require('chokidar');
const log = require('./logger');
const fs = require('fs');
const path = require('path');

module.exports = {
  watchFiles: [],
  getWatchFiles(){
    return this.watchFiles;
  },
  beginWatch(source) {
    log.info({event: 'beginWatch Fired'});
    var watcher = ck.watch(source, {ignored: /(^|[\/\\])\../, persistent: true, usePolling: true});
    watcher.on('add', (p) => {
      log.info({filePathAdded: p});
      this.addFilePath(p);
    });
    watcher.on('unlink', p => log.info({filePathRemoved: p}));
  },
  addFilePath(p){
    log.info({ckFilePath: p});
    let fileName = p.substring(p.lastIndexOf('\\')+1);
    let filePath = p.substring(0,p.lastIndexOf('\\')+1);
    let fullFilePath = p;
    fs.stat(p, (err, stat) => {
      var archDate = new Date(stat.ctime + (30*24*60*60*1000));
      log.info({archiveDate:archDate});
      if(err)
        log.error({fileStatError: err});
      log.info({filePathStatus: stat});
      this.watchFiles.push({
        filePath: filePath,
        fileName: fileName,
        fullFilePath: fullFilePath,
        createdDate: stat.ctime,
        archiveDate: archDate
      });
    });
  },
}
