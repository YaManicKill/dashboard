const path = require("path");
const fs = require('fs');
const archiver = require('archiver');

const archive = archiver('zip');
const output = fs.createWriteStream(__dirname + '/dist/dash.zip');
archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
});
archive.on('error', function(err) {
    throw err;
});
archive.pipe(output);
archive.glob("**/!(*dash.zip)", {cwd: path.join(__dirname, "dist")}, {prefix: ""});

archive.finalize();