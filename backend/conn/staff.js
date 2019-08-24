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
  if (err) console.log(err, 'cant establish connection to mysql');
  else console.log('user connection to mysql established');
});
