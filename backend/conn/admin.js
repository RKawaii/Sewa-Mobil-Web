const mysql = require('mysql2');

//var uuid = require('uuid/v4');

//local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'roots',
  password: '',
  database: 'arphat'
});

connection.connect(function(err) {
  if (err) throw err;
  else console.log('admin connection to mysql established');
});

module.exports = {
  add: (req, res) => {}
};
