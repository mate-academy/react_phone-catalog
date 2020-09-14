/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'donets00.mysql.tools',
  user: 'donets00_lili4ka',
  password: '7mzbB6X%%2',
  database: 'donets00_lili4ka',
  multipleStatements: true,

});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log('good connected');
  } else {
    console.log('error was found', err);
  }
});

module.exports = mysqlConnection;
