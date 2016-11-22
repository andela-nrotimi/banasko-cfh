'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';
var testLocal = 'mongodb://localhost/cfh';

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3500,
  db: process.env.MONGOHQ_URL || testLocal
};
