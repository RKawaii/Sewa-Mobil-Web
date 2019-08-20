//express core
const express = require('express');
const app = express();
const PORT = 5000;
const Route = express.Router();

const age = 1000 * 60 * 60 * 12;
//additional plugin
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const validator = require('express-joi-validation').createValidator({});
const schema = require('./schema/schema');

//mysql connection
const admin = require('./conn/admin');
//const user = require('./conn/user');

//Express Route
//login and regis
Route.get('/login', function(req, res) {
  res.send(req.session.role);
});
Route.post('/login', validator.body(schema.login), function(req, res) {
  admin.login(req, res);
});

//untuk mobil
Route.get('/mobil', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/mobil', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});
Route.put('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk sewa
Route.get('/sewa', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/sewa', validator.body(schema.sewa), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});
Route.put('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk user
Route.get('/user', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/user', validator.body(schema.user), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});
Route.put('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk transaksi
Route.get('/transaksi', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/transaksi', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});
Route.delete('/transaksi', validator.body(schema.transaksi), function(
  req,
  res
) {
  res.json({ hello: 'world' });
});

//untuk staff
Route.get('/staff', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/staff', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});
Route.put('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk riwayat
Route.get('/riwayat', function(req, res) {
  if (req.session.islogged) {
    admin.get(req, res);
  } else res.sendStatus(401);
});
Route.post('/riwayat', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(401);
});

//init express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
  session({
    secret: 'Astolfo 1s n0t g4y',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: age }
  })
);

app.use('/arphat/api', Route);
app.use('/arphat/assets', express.static('assets'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
