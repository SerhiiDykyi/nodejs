const { verifyToken } = require('../services/token.service');
const User = require('../api/auth/auth.model');
const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send('Not authorized');
    }
    const data = await verifyToken(token);
    req.user = data.id;
    const userInfo = await User.findUserById(data.id);

    req.user = {
      email: userInfo.email,
      id: userInfo._id,
      subscription: userInfo.subscription,
    };
    next();
  } catch (error) {
    res.status(401).send('Not authorized');
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
