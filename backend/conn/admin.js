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
  else console.log('admin connection to mysql established');
});

module.exports = {
  login: (req, res) => {
    const { body } = req;

    connection.execute(
      'SELECT * FROM admin where username=?',
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
      case '/mobil':
        sql =
          'SELECT mobil.id AS main_id, mobil.*,jenis_kendaraan.* FROM mobil JOIN jenis_kendaraan  ON mobil.id_jenis_mobil = jenis_kendaraan.id ';
        srcby = 'plat';
        thru = true;
        break;
      case '/sewa':
        sql =
          'SELECT sewa.id AS main_id,jenis_kendaraan.*,sewa.*,mobil.*,user.* FROM sewa join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id ';
        thru = true;
        break;
      case '/user':
        sql = 'SELECT * FROM user ';
        srcby = 'username';
        thru = true;
        break;
      case '/supir':
        sql = 'SELECT * FROM supir ';
        srcby = 'nama';
        thru = true;
        break;
      case '/transaksi':
        sql =
          'SELECT sewa.id AS main_id, transaksi.*,jenis_kendaraan.*,sewa.*,mobil.*,user.*  FROM sewa join transaksi on transaksi.id_sewa = sewa.id join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id ';
        thru = true;
        break;
      case '/staff':
        sql = 'SELECT * FROM staff ';
        srcby = 'nama_staff';
        thru = true;
        break;
      case '/riwayat':
        sql =
          'SELECT riwayat_penyewaan.*, transaksi.kode_transaksi,transaksi.biaya,transaksi.status_transaksi FROM riwayat_penyewaan JOIN transaksi ON riwayat_penyewaan.id_transaksi = transaksi.id ';
        thru = true;
        break;
      case '/jenis':
        sql = 'SELECT * FROM jenis_kendaraan ';
        srcby = 'jenis_mobil';
        thru = true;
        break;
      case '/mobil/:id':
        sql = `SELECT mobil.id AS main_id, mobil.*,jenis_kendaraan.* FROM mobil JOIN jenis_kendaraan  ON mobil.id_jenis_mobil = jenis_kendaraan.id where id=${req.params.id} `;
        thru = true;
        break;
      case '/sewa/:id':
        sql = `SELECT sewa.id AS main_id,jenis_kendaraan.*,sewa.*,mobil.*,user.* FROM sewa join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id where id=${req.params.id} `;
        thru = true;
        break;
      case '/user/:id':
        sql = `SELECT * FROM user where id=${req.params.id} `;
        thru = true;
        break;
      case '/transaksi/:id':
        sql = `SELECT transaksi.id AS main_id, transaksi.*,jenis_kendaraan.*,sewa.*,mobil.*,user.*  FROM sewa join transaksi on transaksi.id_sewa = sewa.id join jenis_kendaraan on sewa.id_jenis_mobil = jenis_kendaraan.id join user on user.id = sewa.id_user join mobil on mobil.id_jenis_mobil = jenis_kendaraan.id where id=${req.params.id} `;
        thru = true;
        break;
      case '/staff/:id':
        sql = `SELECT * FROM staff where id=${req.params.id} `;
        thru = true;
        break;
      case '/riwayat/:id':
        sql = `SELECT riwayat_penyewaan.id as main_id,riwayat_penyewaan.*, transaksi.kode_transaksi,transaksi.biaya,transaksi.status_transaksi FROM riwayat_penyewaan JOIN transaksi ON riwayat_penyewaan.id_transaksi = transaksi.id where id=${req.params.id} `;
        thru = true;
        break;
      case '/jenis/:id':
        sql = `SELECT * FROM jenis kendaraan where id=${req.params.id} `;
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
      case '/mobil':
        sql =
          'INSERT INTO `mobil`( `id_jenis_mobil`, `plat`, `banyak_penumpang`, `harga`, `status`) VALUES (?,?,?,?,?)';
        val = [
          body.id_jenis_mobil,
          body.plat,
          body.kursi,
          body.harga,
          body.status
        ];
        pass = true;
        break;
      case '/staff':
        sql =
          'INSERT INTO `staff`( `kode_staff`, `nama_staff`, `username`, `password`) VALUES (?,?,?,MD5(?))';
        val = [body.kode, body.nama, body.username, body.password];
        pass = true;
        break;
      case '/user':
        sql =
          'INSERT INTO `user`( `UID`, `telepon`, `alamat`, `username`, `password`, `email`) VALUES (?,?,?,?,MD5(?),?)';
        val = [
          body.UID,
          body.telepon,
          body.alamat,
          body.username,
          body.password,
          body.email
        ];
        pass = true;
        break;
      case '/jenis':
        sql = 'INSERT INTO `jenis_kendaraan`(`jenis_mobil`) VALUES (?)';
        val = [body.jenis_mobil];
        pass = true;
        break;
      case '/supir':
        sql =
          'INSERT INTO `supir`(`nama`, `alamat`, `telepon`, `status`) VALUES (?,?,?,?)';
        val = [body.nama, body.alamat, body.telepon, body.status];
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
      case '/mobil/:id':
        sql =
          'UPDATE `mobil` SET `id_jenis_mobil`=?,`plat`=?,`kursi`=?,`harga`=?,`status`=? WHERE id=?';
        val = [
          body.id_jenis_mobil,
          body.plat,
          body.kursi,
          body.harga,
          body.status,
          req.params.id
        ];
        pass = true;
        break;
      case '/staff/:id':
        sql =
          'UPDATE `staff` SET `kode_staff`=?,`nama_staff`=?,`username`=?,`password`=MD5(?) WHERE id=?';
        val = [
          body.kode,
          body.nama,
          body.username,
          body.password,
          req.params.id
        ];
        pass = true;
        break;
      case '/user/:id':
        sql =
          'UPDATE `user` SET `UID`=?,`telepon`=?,`username`=?,`password`=MD5(?),`email`=? WHERE id=?';
        val = [
          body.UID,
          body.telepon,
          body.username,
          body.password,
          body.email,
          req.params.id
        ];
        pass = true;
        break;
      case '/jenis/:id':
        sql = 'UPDATE `jenis_kendaraan` SET `jenis_mobil`=? WHERE id=?';
        val = [body.jenis_mobil, req.params.id];
        pass = true;
        break;
      case '/supir/:id':
        sql =
          'UPDATE `supir` SET `nama`=?,`alamat`=?,`telepon`=?,`status`=? WHERE id=?';
        val = [
          body.nama,
          body.alamat,
          body.telepon,
          body.status,
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
  },
  del: (req, res) => {
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
      case '/user/:id':
        table = 'user';
        thru = true;
        break;
      case '/transaksi/:id':
        table = 'transaksi';
        thru = true;
        break;
      case '/staff/:id':
        table = 'staff';
        thru = true;
        break;
      case '/riwayat/:id':
        table = 'riwayat_penyewaan';
        thru = true;
        break;
      case '/jenis/:id':
        table = 'jenis_kendaraan';
        thru = true;
        break;
      case '/supir/:id':
        table = 'supir';
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
