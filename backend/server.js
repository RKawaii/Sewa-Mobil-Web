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
const cors = require('cors');
const passport = require('passport');

//mysql connection
const admin = require('./conn/admin');
const user = require('./conn/user');

//Express Route
//login and regis
Route.get('/login', function(req, res) {
  if (req.session.islogged === true) {
    res.json({
      role: req.session.role,
      user_id: req.session.user_id
    });
  } else res.sendStatus(401);
});
Route.post('/login', validator.body(schema.login), function(req, res) {
  if (req.body.role === 'admin') {
    admin.login(req, res);
  } else if (req.body.role === 'user') {
    user.login(req, res);
  }
});

Route.post('/login2', function(req, res) {
  admin.login2(req, res);
});

Route.get('/logout', function(req, res) {
  try {
    req.session.destroy();
    res.send('logout');
  } catch (error) {
    res.sendStatus(500);
  }
});

//untuk mobil
Route.get('/mobil', validator.query(schema.getting), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.gets(req, res);
    } else if (req.session.role === 'user') {
      user.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403); /** */
});
Route.get('/mobil/:id', validator.params(schema.id), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.get(req, res);
    } else if (req.session.role === 'user') {
      user.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/mobil', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put(
  '/mobil/:id',
  validator.body(schema.mobil),
  validator.params(schema.id),
  function(req, res) {
    if (req.session.islogged) {
      if (req.session.role === 'admin') {
        admin.upd(req, res);
      } else {
        res.sendStatus(401);
      }
    } else res.sendStatus(403);
  }
);
Route.delete('/mobil/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//untuk sewa
Route.get('/sewa', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'user') {
      user.gets(req, res);
    } else if (req.session.role === 'user') {
      user.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.get('/sewa/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'user') {
      admin.get(req, res);
    } else if (req.session.role === 'user') {
      user.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/sewa', validator.body(schema.sewa), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'user') {
      user.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put('/sewa/:id', validator.body(schema.sewa), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'user') {
      user.upd(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.delete('/sewa/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      user.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//untuk user
Route.get('/user', validator.query(schema.getting), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.gets(req, res);
    } else if (req.session.role === 'user') {
      user.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.get('/user/:id', validator.params(schema.id), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.get(req, res);
    } else if (req.session.role === 'user') {
      user.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/user', validator.body(schema.user), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.add(req, res);
    } else if (req.session.role === 'user') {
      user.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put('/user/:id', validator.body(schema.user), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.upd(req, res);
    } else if (req.session.role === 'user') {
      user.upd(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.delete('/user/:id', validator.body(schema.user), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//untuk transaksi
Route.get('/transaksi', function(req, res) {
  if (req.session.islogged) {
    admin.gets(req, res);
  } else res.sendStatus(403);
});
Route.post('/transaksi', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(403);
});
Route.delete('/transaksi', validator.body(schema.transaksi), function(
  req,
  res
) {
  res.json({ hello: 'world' });
});

//untuk staff
Route.get('/staff', validator.query(schema.getting), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.get('/staff/id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/staff', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put('/staff/:id', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.upd(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.delete('/staff/:id', validator.body(schema.transaksi), function(
  req,
  res
) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//untuk riwayat
Route.get('/riwayat', function(req, res) {
  if (req.session.islogged) {
    admin.gets(req, res);
  } else res.sendStatus(403);
});
Route.post('/riwayat', validator.body(schema.transaksi), function(req, res) {
  if (req.session.islogged) {
    admin.add(req, res);
  } else res.sendStatus(403);
});

//untuk supir
Route.get('/supir', validator.query(schema.getting), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.get('/supir/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/supir', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put('/supir/:id', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.upd(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.delete('/supir/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//untuk jenis_mobil
Route.get('/jenis', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.gets(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.get('/jenis/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.get(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.post('/jenis', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.add(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.put('/jenis/:id', validator.body(schema.mobil), function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.upd(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});
Route.delete('/jenis/:id', function(req, res) {
  if (req.session.islogged) {
    if (req.session.role === 'admin') {
      admin.del(req, res);
    } else {
      res.sendStatus(401);
    }
  } else res.sendStatus(403);
});

//init express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: 'Astolfo 1s n0t g4y',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: age }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', Route);
app.use('/arphat/assets', express.static('assets'));
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
