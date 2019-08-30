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
  }
};
