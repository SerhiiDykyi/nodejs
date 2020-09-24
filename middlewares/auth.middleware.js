const { verifyToken } = require('../services/token.service');
const User = require('../api/auth/auth.model');
const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send('No token provided!!');
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    const userInfo = await User.findUserById(data.id);
    req.userInfo = {
      email: userInfo.email,
      id: userInfo._id,
      subscription: userInfo.subscription,
    };
    next();
  } catch (error) {
    res.status(401).send('Invalid token!!');
  }
};

const checkUserSub = subscription => async (req, res, next) => {
  const isValideSub = subscription.includes(req.userInfo.subscription);
  if (isValideSub) {
    next();
    return;
  }
  res.status(403).send('Fobidden');
};

module.exports = { checkAuthTokenMiddleware, checkUserSub };
