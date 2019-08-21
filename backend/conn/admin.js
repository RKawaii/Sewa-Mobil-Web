const mysql = require('mysql2');
const crypto = require('crypto');

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
  login: (req, res) => {
    const { body } = req;

    connection.execute(
      'SELECT password FROM admin where username=?',
      [body.username],
      (err, results) => {
        if (err) {
          res.sendStatus(404);
        } else {
          if (results) {
            let hash = crypto
              .createHash('md5')
              .update(body.password)
              .digest('hex');
            results = results[0];

            if (hash === results.password) {
              if (err) {
                res.sendStatus(500);
                console.log(err);
              } else {
                req.session.role = 'admin';
                req.session.user_id = results.id;
                req.session.islogged = true;
                res.sendStatus(200);
              }
            } else res.sendStatus(404);
          } else {
            res.sendStatus(404);
          }
        }
      }
    );
  },
  get: (req, res) => {
    const { path } = req.route;
    let thru = false;
    let table = '';
    switch (path) {
      case '/mobil':
        table = 'mobil';
        thru = true;
        break;
      case '/sewa':
        table = 'sewa';
        thru = true;
        break;
      case '/user':
        table = 'user';
        thru = true;
        break;
      case '/transaksi':
        table = 'transaksi';
        thru = true;
        break;
      case '/staff':
        table = 'staff';
        thru = true;
        break;
      case '/riwayat':
        table = 'riwayat_penyewaan';
        thru = true;
        break;
      default:
        thru = false;
        break;
    }

    const sql = `SELECT * FROM ${table}`;
    if (thru) {
      connection.query(sql, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else res.sendStatus(404);
  },
  add: (req, res) => {
    const { path } = req.route;
    const { body } = req;

    switch (path) {
      case '/mobil':
        connection.execute(
          'INSERT INTO `mobil`( `nama`, `jenis`, `merek`, `kursi`, `tahun`) VALUES (?,?,?,?,?)',
          [body.nama, body.jenis, body.merek, body.kursi, body.tahun],
          (err, results) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else res.json(results);
          }
        );
        break;
      case '/staff':
        connection.execute(
          'INSERT INTO `staff`(`kode_staff`, `nama_staff`, `alamat_staff`, `telepon_staff`, `username`, `password`) VALUES (?,?,?,?,?,?)',
          [
            body.kode,
            body.nama,
            body.alamat,
            body.telepon,
            body.username,
            body.password
          ],
          (err, results) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else res.json(results);
          }
        );
        break;
      default:
        res.sendStatus(404);
        break;
    }
  }
};
