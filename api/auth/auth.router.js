const { Router } = require('express');
const authRouter = Router();
const {
  registrationContoller,
  loginContoller,
  getCurrentUserController,
} = require('./auth.controller');
const {
  checkAuthTokenMiddleware,
  checkUserSub,
} = require('../../middlewares/auth.middleware');

authRouter.post('/register', registrationContoller);
authRouter.post('/login', loginContoller);
authRouter.get('/current', checkAuthTokenMiddleware, getCurrentUserController);

module.exports = authRouter;
