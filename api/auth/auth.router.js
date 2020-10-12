const { Router } = require('express');
const authRouter = Router();
const {
  registrationContoller,
  loginContoller,
  logoutContoller,
  getCurrentUserController,
  renewalSubContoller,
  verifyTokenController,
  uploadAvatarContoller
} = require('./auth.controller');
const {avatarUploaderMiddleware}=require('../../middlewares/fileUploader.middleware')
const {
  checkAuthTokenMiddleware,
} = require('../../middlewares/auth.middleware');
const {
  registrationValidatorMiddleware,
  loginValidatorMiddleware,
} = require('./auth.validator');

authRouter.get('/verify/:verificationToken', verifyTokenController);
authRouter.post(
  '/register',
  registrationValidatorMiddleware,
  registrationContoller,
);
authRouter.post('/avatar', checkAuthTokenMiddleware, avatarUploaderMiddleware);
authRouter.patch(
  '/avatar',
  checkAuthTokenMiddleware,
  avatarUploaderMiddleware,
  uploadAvatarContoller,
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
