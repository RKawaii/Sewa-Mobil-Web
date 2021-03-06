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
      case '/mobil':
        sql =
          'SELECT mobil.id,jenis_kendaraan.jenis_mobil,mobil.plat,mobil.banyak_penumpang,mobil.harga,mobil.status FROM mobil JOIN jenis_kendaraan  ON mobil.id_jenis_mobil = jenis_kendaraan.id ';
        srcby = 'plat';
        thru = true;
        break;
      case '/sewa':
        sql = `SELECT sewa.id,jenis_kendaraan.jenis_mobil, user.email, sewa.penggunaan_supir, sewa.mulai_sewa, sewa.akhir_sewa, sewa.lokasi_pickup, sewa.lokasi_destinasi FROM sewa join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user where user.id=${req.userData.id} `;
        thru = true;
        break;
      case '/transaksi':
        sql = `SELECT sewa.*, transaksi.kode_transaksi, transaksi.biaya, transaksi.status_transaksi FROM sewa join transaksi on transaksi.id_sewa = sewa.id where sewa.id_user=${req.userData.id} `;
        thru = true;
        break;
      case '/riwayat':
        sql = `SELECT riwayat_penyewaan.*,transaksi.kode_transaksi,transaksi.biaya,transaksi.status_transaksi, sewa.id_user FROM riwayat_penyewaan JOIN transaksi ON riwayat_penyewaan.id_transaksi = transaksi.id join sewa on sewa.id = transaksi.id_sewa where sewa.id_user=${req.userData.id} `;
        thru = true;
        break;
      case '/mobil/:id':
        sql = `SELECT mobil.id,jenis_kendaraan.jenis_mobil,mobil.plat,mobil.banyak_penumpang,mobil.harga,mobil.status FROM mobil JOIN jenis_kendaraan  ON mobil.id_jenis_mobil = jenis_kendaraan.id where id=${req.params.id} `;
        thru = true;
        break;
      case '/sewa/:id':
        sql = `SELECT sewa.id,jenis_kendaraan.jenis_mobil, user.email, sewa.penggunaan_supir, sewa.mulai_sewa, sewa.akhir_sewa, sewa.lokasi_pickup, sewa.lokasi_destinasi FROM sewa join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user where user.id=${req.userData.id} and where id=${req.params.id} `;
        thru = true;
        break;
      case '/transaksi/:id':
        sql = `SELECT sewa.*, transaksi.kode_transaksi, transaksi.biaya, transaksi.status_transaksi FROM sewa join transaksi on transaksi.id_sewa = sewa.id where sewa.id_user=${req.userData.id} and where id=${req.params.id} `;
        thru = true;
        break;
      case '/riwayat/:id':
        sql = `SELECT sewa.*, transaksi.kode_transaksi, transaksi.biaya, transaksi.status_transaksi FROM sewa join transaksi on transaksi.id_sewa = sewa.id where sewa.id_user=${req.userData.id} and where id=${req.params.id} `;
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
      case '/transaksi':
        sql =
          'INSERT INTO `transaksi`(`kode_transaksi`, `id_sewa`, `biaya`, `status_transaksi`) VALUES (?,?,?,?)';
        val = [
          body.kode_transaksi,
          body.id_sewa,
          body.biaya,
          body.status_transaksi
        ];
        pass = true;
        break;
      case '/riwayat':
        sql =
          'INSERT INTO `riwayat_penyewaan`(id_transaksi`, `status_riwayat`) VALUES (?,?)';
        val = [body.id, body.status];
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
      case '/riwayat/:id':
        sql =
          'UPDATE `riwayat_penyewaan` SET ,`id_transaksi`=?,`status_riwayat`=? WHERE `id`=?';
        val = [body.id, body.status, req.params.id];
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
      case '/transaksi/:id':
        table = 'transaksi';
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
