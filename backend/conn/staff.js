const mysql = require('mysql2');
const crypto = require('crypto');
const keys = require('../schema/keys');
const jwt = require('jsonwebtoken');

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

module.exports = {
  login: (req, res) => {
    const { body } = req;

    connection.execute(
      'SELECT * FROM staff where username=?',
      [body.username],
      (err, results) => {
        if (err) {
          res.sendStatus(404);
        } else {
          if (!(results.length === 0)) {
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
                const token = jwt.sign(
                  {
                    role: 'admin',
                    id: results.id
                  },
                  keys,
                  { expiresIn: '5h' }
                );

                res.status(200).json({
                  msg: 'login berhasil',
                  Token: token
                });
              }
            } else res.sendStatus(422);
          } else {
            res.sendStatus(404);
          }
        }
      }
    );
  },
  get: (req, res) => {
    const { path } = req.route;
    const { query } = req;
    let thru = false;
    let srcby = '';
    let sql = '';

    switch (path) {
      case '/transaksi':
        sql =
          'SELECT sewa.id AS main_id, transaksi.*,jenis_kendaraan.*,sewa.*,mobil.*  FROM sewa join transaksi on transaksi.id_sewa = sewa.id join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id ';
        thru = true;
        break;
      case '/transaksi/:id':
        sql = `SELECT sewa.id AS main_id, transaksi.*,jenis_kendaraan.*,sewa.*,mobil.*  FROM sewa join transaksi on transaksi.id_sewa = sewa.id join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id where sewa.id=${req.params.id} `;
        thru = true;
        break;
      default:
        thru = false;
        break;
    }
    if (thru) {
      let offset = '';
      if (Object.keys(query).length) {
        if (query.search !== undefined) {
          sql += `where ${srcby} LIKE ${mysql.escape(
            '%' + query.search + '%'
          )} `;
        }
        if (query.skip !== undefined) {
          offset = mysql.escape(query.skip) + ',';
        }
      }
      sql += `limit ${offset}10 `;

      connection.query(sql, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else res.sendStatus(404);
  },
  upd: (req, res) => {
    const { path } = req.route;
    const { body } = req;
    let sql = '';
    let val = [];
    let pass = false;
    switch (path) {
      case '/transaksi/:id':
        sql =
          'UPDATE `transaksi` SET `kode_transaksi`=?,`id_sewa`=?,`biaya`=?,`status_transaksi`=? WHERE `id`=?';
        val = [
          body.kode_transaksi,
          body.id_sewa,
          body.biaya,
          body.status_transaksi,
          req.params.id
        ];
        pass = true;
        break;
    }
    console.log(sql);

    if (pass) {
      connection.execute(sql, val, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else {
      res.sendStatus(404);
    }
  }
};
