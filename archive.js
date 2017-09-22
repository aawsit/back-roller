const fs = require('fs');
const mv = require('mv');
const path = require('path');

module.exports = {
  now(fileList, destination){
    for(let file of fileList){
      if(file.archiveDate <= Date.now()){
        mv(file.fullFilePath, path.join(destination, file.fileName), (err) => {
          if(err)
            return log.error({fileMoveError: err});
          log.info({fileMove: 'File Moved Successfully'});
        });
      }
    }
  }
}
