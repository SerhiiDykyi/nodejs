const UserDB = require('./auth.model');
const bcrypt = require('bcrypt');
const {
  createVerificationToken,
  createEmailToken,
  checkEmailToken,
} = require('../../services/token.service');

const token = createEmailToken();

const { sendEmail } = require('../../services/mail.service');

const registrationContoller = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      body: { email },
    } = req;
    sendEmail(email, token);
    req.userToken = token;
    const hachedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      verificationToken: token,
      password: hachedPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    const { code } = error;
    if (code === 11000) {
      res.status(409).json({ message: 'Email in use' });
      next(error);
      return;
    }
    res.status(400).json({ message: 'missing required name field' });

    next(error);
  }
};

const loginContoller = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await UserDB.findUserByEmail({ email });
    if (!user) {
      return res.status(400).json({ message: `Email or password is wrong` });
    }
    if (user.verificationToken) {
      return res.status(404).json({ message: `Please verify you account` });
    }
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      return res.status(401).json({ message: `Email or password is wrong` });
    }
    const access_token = await createVerificationToken({ id: user._id });
    await UserDB.updateUser(user._id, {
      token: access_token,
    });

    res.status(201).json({
      token: access_token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' });

    next(error);
  }
};

const logoutContoller = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req;

    const userById = await UserDB.findUserById({ _id: id });
    if (!userById.token) {
      res.status(401).json({ message: 'No autorization' });
      return;
    }
    await UserDB.updateUser(userById._id, {
      token: '',
    });
    return res.status(204).send('No content');
  } catch (error) {
    next(error);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req;
    const currenUserById = await UserDB.findUserById({ _id: id });
    if (!currenUserById.token) {
      res.status(401).json({ message: 'No autorization' });
      return;
    }

    res.status(200).json({
      email: currenUserById.email,
      subscription: currenUserById.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const renewalSubContoller = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req;
    const {
      body: { subscription },
    } = req;
    const userById = await UserDB.findUserById({ _id: id });

    if (!userById.token) {
      res.status(401).json({ message: 'No autorization' });
      return;
    }
    possibleSub = ['free', 'pro', 'premium'];

    if (!possibleSub.includes(subscription)) {
      res.status(400).json({
        message: `subscription type ${userById.subscription} does not exist`,
      });
      return;
    }
    const renewalUserSub = await UserDB.updateUser(userById._id, {
      subscription,
    });
    return res.status(200).json({
      email: renewalUserSub.email,
      subscription: renewalUserSub.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const verifyTokenController = async (req, res, next) => {
  try {
    const {
      params: { verificationToken },
    } = req;

    const isValidToken = checkEmailToken(verificationToken);

    if (!isValidToken) {
      return res.status(400).json({ message: `User not found` });
    }
    const userByToken = await UserDB.findUserByToken({ verificationToken });
    if (!userByToken) {
      return res.status(400).json({ message: `User not found` });
    }
    await UserDB.updateUser(userByToken._id, {
      verificationToken: false,
    });
    res.status(200).json('ok');
  } catch (error) {
    res.status(400).json({ message: 'Shit happe' });

    next(error);
  }
};

module.exports = {
  registrationContoller,
  loginContoller,
  logoutContoller,
  getCurrentUserController,
  renewalSubContoller,
  verifyTokenController,
};
