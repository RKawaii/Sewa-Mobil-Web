const jwt = require('jsonwebtoken');
const keys = require('../schema/keys');

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, keys);

    req.userData = decoded;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
