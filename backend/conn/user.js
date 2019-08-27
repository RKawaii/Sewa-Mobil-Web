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
  if (err) throw err;
  else console.log('user connection to mysql established');
});

module.exports = {
  login: (req, res) => {
    const { body } = req;

    connection.execute(
      'SELECT password FROM user where email=?',
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
                    role: 'user',
                    id: results.id
                  },
                  keys,
                  { expiresIn: '2h' }
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
  gets: (req, res) => {
    const { path } = req.route;
    let thru = false;
    let table = '';
    switch (path) {
      case '/mobil':
        table = 'mobil';
        thru = true;
        break;
      case '/user':
        table = 'user';
        thru = true;
        break;
      case '/sewa':
        table = 'sewa';
        thru = true;
        break;
      case '/transaksi':
        table = 'transaksi';
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

    if (thru) {
      const sql = `SELECT * FROM ${table} limit 10`;
      connection.query(sql, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else res.sendStatus(404);
  },
  get: (req, res) => {
    const { path } = req.route;
    let thru = false;
    let table = '';
    switch (path) {
      case '/mobil/:id':
        table = 'mobil';
        thru = true;
        break;
      case '/sewa/:id':
        table = 'sewa';
        thru = true;
        break;
      case '/transaksi/:id':
        table = 'transaksi';
        thru = true;
        break;
      case '/riwayat/:id':
        table = 'riwayat_penyewaan';
        thru = true;
        break;
      default:
        thru = false;
        break;
    }

    if (thru) {
      const sql = `SELECT * FROM ${table} where id=${req.userData.id}`;
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
    let sql = '';
    let val = [];
    let pass = false;

    switch (path) {
      case '/sewa':
        sql =
          'INSERT INTO `sewa`(`id_user`, `id_jenis_mobil`, `penggunaan_supir`, `mulai_sewa`, `akhir_sewa`, `lokasi_pickup`, `lokasi_destinasi`) VALUES (?,?,?,DATETIME(?),DATETIME(?),?,?)';
        val = [
          req.userData.id,
          body.id_jenis,
          body.penggunaan_supir,
          body.mulai_sewa,
          body.akhir_sewa,
          body.lokasi_pickup,
          body.lokasi_destinasi
        ];
        pass = true;
        break;
    }

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
  },
  upd: (req, res) => {
    const { path } = req.route;
    const { body } = req;
    let sql = '';
    let val = [];
    let pass = false;

    switch (path) {
      case '/sewa/:id':
        sql =
          'UPDATE `sewa` SET `id_user`=?,`id_jenis_mobil`=?,`penggunaan_supir`=?,`mulai_sewa`=?,`akhir_sewa`=?,`lokasi_pickup`=?,`lokasi_destinasi`=? WHERE `id`=?';
        val = [
          body.req.userData.id,
          body.id_jenis,
          body.penggunaan_supir,
          body.mulai_sewa,
          body.akhir_sewa,
          body.lokasi_pickup,
          body.lokasi_destinasi,
          req.params.id
        ];
        pass = true;
        break;
    }

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
  },
  del: (req, res) => {
    const { path } = req.route;
    let thru = false;
    let table = '';
    switch (path) {
      case '/sewa/:id':
        table = 'sewa';
        thru = true;
        break;

      default:
        thru = false;
        break;
    }

    if (thru) {
      const sql = `DELETE FROM ${table} where id=${req.userData.id}`;
      connection.query(sql, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else res.sendStatus(404);
  }
};
