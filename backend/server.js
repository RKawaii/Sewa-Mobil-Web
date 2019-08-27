//express core
const express = require('express');
const app = express();
const PORT = 5000;
const Route = express.Router();

//additional plugin
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const validator = require('express-joi-validation').createValidator({});
const schema = require('./schema/schema');
const cors = require('cors');
const auth = require('./middleware/auth');
//mysql connection
const admin = require('./conn/admin');
const user = require('./conn/user');

//Express Route
//login and regis

Route.post('/login', validator.body(schema.login), function(req, res) {
  if (req.body.role === 'admin') {
    admin.login(req, res);
  } else if (req.body.role === 'user') {
    user.login(req, res);
  }
});
Route.get('/login', auth, function(req, res) {
  if (
    !(
      Object.entries(req.userData).length === 0 &&
      req.userData.constructor === Object
    )
  ) {
    res.sendStatus(200);
  } else res.sendStatus(403);
});

//untuk mobil
Route.get('/mobil', validator.query(schema.getting), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.gets(req, res);
  } else if (req.userData.role === 'user') {
    user.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/mobil/:id', validator.params(schema.id), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.get(req, res);
  } else if (req.userData.role === 'user') {
    user.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/mobil', validator.body(schema.mobil), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put(
  '/mobil/:id',
  validator.body(schema.mobil),
  validator.params(schema.id),
  auth,
  function(req, res) {
    if (req.userData.role === 'admin') {
      admin.upd(req, res);
    } else {
      res.sendStatus(403);
    }
  }
);
Route.delete('/mobil/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//untuk sewa
Route.get('/sewa', auth, function(req, res) {
  if (req.userData.role === 'user') {
    user.gets(req, res);
  } else if (req.userData.role === 'user') {
    user.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/sewa/:id', auth, function(req, res) {
  if (req.userData.role === 'user') {
    admin.get(req, res);
  } else if (req.userData.role === 'user') {
    user.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/sewa', validator.body(schema.sewa), auth, function(req, res) {
  if (req.userData.role === 'user') {
    user.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put('/sewa/:id', validator.body(schema.sewa), auth, function(req, res) {
  if (req.userData.role === 'user') {
    user.upd(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.delete('/sewa/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    user.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//untuk user
Route.get('/user', validator.query(schema.getting), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.gets(req, res);
  } else if (req.userData.role === 'user') {
    user.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/user/:id', validator.params(schema.id), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/user', validator.body(schema.user), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.add(req, res);
  } else if (req.userData.role === 'user') {
    user.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put('/user/:id', validator.body(schema.user), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.upd(req, res);
  } else if (req.userData.role === 'user') {
    user.upd(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.delete('/user/:id', validator.body(schema.user), auth, function(
  req,
  res
) {
  if (req.userData.role === 'admin') {
    admin.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//untuk transaksi
Route.get('/transaksi', auth, function(req, res) {
  admin.gets(req, res);
});
Route.post('/transaksi', validator.body(schema.transaksi), auth, function(
  req,
  res
) {
  admin.add(req, res);
});
Route.delete('/transaksi', validator.body(schema.transaksi), function(
  req,
  res
) {
  res.json({ hello: 'world' });
});

//untuk staff
Route.get('/staff', validator.query(schema.getting), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/staff/id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/staff', validator.body(schema.transaksi), auth, function(
  req,
  res
) {
  if (req.userData.role === 'admin') {
    admin.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put('/staff/:id', validator.body(schema.transaksi), auth, function(
  req,
  res
) {
  if (req.userData.role === 'admin') {
    admin.upd(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.delete('/staff/:id', validator.body(schema.transaksi), function(
  req,
  res
) {
  if (req.userData.role === 'admin') {
    admin.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//untuk riwayat
Route.get('/riwayat', auth, function(req, res) {
  admin.gets(req, res);
});
Route.post('/riwayat', validator.body(schema.transaksi), auth, function(
  req,
  res
) {
  admin.add(req, res);
});

//untuk supir
Route.get('/supir', validator.query(schema.getting), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/supir/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/supir', validator.body(schema.mobil), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put('/supir/:id', validator.body(schema.mobil), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.upd(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.delete('/supir/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//untuk jenis_mobil
Route.get('/jenis', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.gets(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.get('/jenis/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.get(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.post('/jenis', validator.body(schema.mobil), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.add(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.put('/jenis/:id', validator.body(schema.mobil), auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.upd(req, res);
  } else {
    res.sendStatus(403);
  }
});
Route.delete('/jenis/:id', auth, function(req, res) {
  if (req.userData.role === 'admin') {
    admin.del(req, res);
  } else {
    res.sendStatus(403);
  }
});

//init express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use('/api', Route);
app.use('/arphat/assets', express.static('assets'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
