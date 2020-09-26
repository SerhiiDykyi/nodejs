const { Router } = require('express');
const authRouter = Router();
const {
  registrationContoller,
  loginContoller,
  logoutContoller,
  getCurrentUserController,
  renewalSubContoller,
} = require('./auth.controller');
const {
  checkAuthTokenMiddleware,
} = require('../../middlewares/auth.middleware');

const { registrationValidatorMiddleware } = require('./auth.validator');

authRouter.post(
  '/register',
  registrationValidatorMiddleware,
  registrationContoller,
);
authRouter.post('/login', registrationValidatorMiddleware, loginContoller);
authRouter.post('/logout', checkAuthTokenMiddleware, logoutContoller);
authRouter.get(
  '/current',
  registrationValidatorMiddleware,
  checkAuthTokenMiddleware,
  getCurrentUserController,
);
authRouter.patch('/', checkAuthTokenMiddleware, renewalSubContoller);

module.exports = authRouter;
