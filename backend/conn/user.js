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
                req.session.role = 'user';
                req.session.user_id = results.id;
                req.session.islogged = true;
                res.sendStatus(200);
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
      const sql = `SELECT * FROM ${table} where id=${req.params.id}`;
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
          'INSERT INTO `sewa`(`id_user`, `id_jenis_mobil`, `penggunaan_supir`, `mulai_sewa`, `akhir_sewa`, `lokasi_pickup`, `lokasi_destinasi`) VALUES (?,?,?,?,?,?,?)';
        val = [
          body.id_user,
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
          body.id_user,
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
      const sql = `DELETE FROM ${table} where id=${req.params.id}`;
      connection.query(sql, (err, results) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else res.json(results);
      });
    } else res.sendStatus(404);
  }
};
