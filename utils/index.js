
const fs = require("fs")
    
function readFromFile(filename, cb) {
  fs.open(filename, "r", (err, file) => {
    if (err != null) {
      console.log(err);
      return;
    }
    fs.readFile(file, "utf-8", (err, dat) => {
      if (err != null) {
        console.log(err);
        return;
      }
      const fileContents = dat;
      fs.close(file)
      cb(fileContents)
    });
  });
}

module.exports = {readFromFile}