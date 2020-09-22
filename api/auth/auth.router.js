const { Router } = require('express');
const { registrationContoller, loginContoller } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', registrationContoller);
authRouter.post('/login', loginContoller);

module.exports = authRouter;
