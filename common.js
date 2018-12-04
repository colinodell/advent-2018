const fs = require('fs'),
  path = require('path');

const withDataFile = (directory, filename, callback) => {
  const dataFilePath = path.join(directory, filename);
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;

    callback(data.toString());
  });
};

module.exports = {
  'withDataFile': withDataFile,
};
