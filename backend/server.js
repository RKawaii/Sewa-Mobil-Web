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
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({});

//mysql connection
const admin = require('./conn/admin');

//Express Route
//login and regis
Route.get('/login', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/login', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/register', function(req, res) {
  res.json({ hello: 'world' });
});
//untuk mobil
Route.get('/mobil', function(req, res) {
  admin.get(req, res);
});
Route.post('/mobil', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/mobil', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/mobil', function(req, res) {
  res.json({ hello: 'world' });
});
//untuk sewa
Route.get('/sewa', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/sewa', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/sewa', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/sewa', function(req, res) {
  res.json({ hello: 'world' });
});

//untuk pelaggan
Route.get('/pelanggan', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/pelanggan', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/pelanggan', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/pelanggan', function(req, res) {
  res.json({ hello: 'world' });
});

//untuk transaksi
Route.get('/transaksi', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/transaksi', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/transaksi', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/transaksi', function(req, res) {
  res.json({ hello: 'world' });
});

//untuk staff
Route.get('/staff', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/staff', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/staff', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/staff', function(req, res) {
  res.json({ hello: 'world' });
});

//untuk riwayat
Route.get('/riwayat', function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/riwayat', function(req, res) {
  res.json({ hello: 'world' });
});
Route.put('/riwayat', function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/riwayat', function(req, res) {
  res.json({ hello: 'world' });
});

/* buat validasi data nanti
const test = Joi.object({
  test: Joi.string().required()
});
Route.post('/mobil', validator.body(test), function(req, res) {
  res.json({ hello: 'world' });
});
*/
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

app.use('/api', Route);
app.use('/assets', express.static('assets'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
