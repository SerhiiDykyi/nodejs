const { verifyToken } = require('../services/token.service');

const checkAuthTokenMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send('No token provided!!');
  }
};

module.exports = { checkAuthTokenMiddleware };
