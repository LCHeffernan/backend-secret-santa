const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  //check if the token is provided
  if (!token) {
    return res.status(403).sent({
      message: 'No token provided!',
    });
  }
  //use the jwt verify() function to check that it is correct
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorised!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
