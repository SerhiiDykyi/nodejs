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

const {
  registrationValidatorMiddleware,
  loginValidatorMiddleware,
} = require('./auth.validator');

authRouter.post(
  '/register',
  registrationValidatorMiddleware,
  registrationContoller,
);
authRouter.post('/login', loginValidatorMiddleware, loginContoller);
authRouter.post('/logout', checkAuthTokenMiddleware, logoutContoller);
authRouter.get(
  '/current',
  loginValidatorMiddleware,
  checkAuthTokenMiddleware,
  getCurrentUserController,
);
authRouter.patch('/', checkAuthTokenMiddleware, renewalSubContoller);

module.exports = authRouter;
