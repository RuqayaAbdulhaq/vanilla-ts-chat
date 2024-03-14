const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'dist'); // Adjust the path as needed

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    if (path.extname(file) === '.js') {
      let oldPath = path.join(directoryPath, file);
      let newPath = path.join(directoryPath, file.replace('.js', '.mjs'));

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log('Rename complete!');
      });
    }
  });
});
