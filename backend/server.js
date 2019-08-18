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
  res.json({ hello: 'world' });
});
Route.put('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});
Route.delete('/mobil', validator.body(schema.mobil), function(req, res) {
  res.json({ hello: 'world' });
});

//untuk sewa
Route.get('/sewa', validator.body(schema.sewa), function(req, res) {
  res.json({ hello: 'world' });
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
Route.get('/user', validator.body(schema.user), function(req, res) {
  res.json({ hello: 'world' });
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
Route.get('/transaksi', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
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
Route.get('/staff', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
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
Route.get('/riwayat', validator.body(schema.transaksi), function(req, res) {
  res.json({ hello: 'world' });
});
Route.post('/riwayat', validator.body(schema.transaksi), function(req, res) {
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
