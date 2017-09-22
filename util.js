const fs = require('fs');
const log = require('./logger');
const path = require('path');

module.exports = {
  generateSchedule(schedule) {
    var schedule = `* ${schedule.min} ${schedule.hour} * * *`;
    return schedule;
  },
  ensureFolders(source, destination){
      fs.readdir(source, (err, items) =>{
        log.info({readDirOutput: items});
        items.forEach((item) => {
          fs.lstat(path.join(source,item), (err, stat) => {
            if(err)
              return log.error({fsError: err});
            if(stat.isDirectory()){
              let directory = item.split('\\');
              let folderName = directory[directory.length-1];
              let folderDest = path.join(destination, folderName);
              if(!fs.existsSync(folderDest)){
                fs.mkdirSync(folderDest);
              }
            }

          });
        });
      });
  }
}
