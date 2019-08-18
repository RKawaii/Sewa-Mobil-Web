const mysql = require('mysql2');
//const uniqid = require('uniqid');
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
  else console.log('user connection to mysql established');
});

module.exports = {
  register: (req, res) => {
    const data = req.body;
    const uniq_key = 'asd';

    connection.execute(
      'INSERT INTO `user`( `nama`, `alamat`, `telepon`, `username`, `password`, `email`,`verify_key`) VALUES (?,?,?,?,?,?,?)',
      [
        data.nama,
        data.alamat,
        data.telepon,
        data.username,
        data.password,
        data.email,
        uniq_key
      ],
      function(err, results) {
        console.log(err);

        res.json(results);
      }
    );
  }
};
