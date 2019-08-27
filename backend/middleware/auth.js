const jwt = require('jsonwebtoken');
const keys = require('../schema/keys');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, keys);
    req.userData = decoded;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
