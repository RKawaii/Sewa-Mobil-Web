//express core
const express = require('express');
const app = express();
const PORT = 5000;
const Route = express.Router();

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
const user = require('./conn/user');

//Express Route
//login and regis
Route.get('/login', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/login', function(req, res) {
  res.json({ hello: 'world' });
});

//untuk mobil
Route.get('/mobil', function(req, res) {
  admin.get(req, res);
});
Route.post('/mobil', validator.body(schema.mobil), function(req, res) {
  admin.add(req, res);
});
Route.put('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk sewa
Route.get('/sewa', function(req, res) {
  admin.get(req, res);
});
Route.post('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk user
Route.get('/user', function(req, res) {
  admin.get(req, res);
});
Route.post('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk transaksi
Route.get('/transaksi', function(req, res) {
  admin.get(req, res);
});
Route.post('/transaksi', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/transaksi', validator.body(schema.transaksi), function(
  req,
  res
) {
  res.json({ hello: 'world' });
});

//untuk staff
Route.get('/staff', function(req, res) {
  admin.get(req, res);
});
Route.post('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk riwayat
Route.get('/riwayat', function(req, res) {
  admin.get(req, res);
});
Route.post('/riwayat', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
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
    cookie: { maxAge: 0 }
  })
);

app.use('/arphat/api', Route);
app.use('/arphat/assets', express.static('assets'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
