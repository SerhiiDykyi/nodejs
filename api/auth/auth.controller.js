const UserDB = require('./auth.model');
const bcrypt = require('bcrypt');
const { createVerificationToken } = require('../../services/token.service');
const { avatar } = require('../../services/avatar.services');

const registrationContoller = async (req, res, next) => {
  try {
    const { body } = req;
    const variant = 'female';
    const image = await avatar.generate(`${body.email}`, variant);
    image.png().toFile(`public/images/${body.email}.png`);

    const hachedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      avatarURL: `http:3000/images/${body.email}.png`,
      password: hachedPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        avatarURL: newUser.avatarURL,
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
const uploadAvatarContoller = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req;
    const { file } = req;

    const userById = await UserDB.findUserById({ _id: id });

    if (!userById.token) {
      res.status(401).json({ message: 'No autorization' });
      return;
    }

    if (!file) {
      res.status(400).json({
        message: `Avatar not found`,
      });
      return;
    }
    const avatarURL = `http://localhost:3000/images/${file.filename}`;
    const renewalUserSub = await UserDB.updateUser(userById._id, {
      avatarURL,
    });
    return res.status(200).json(renewalUserSub);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationContoller,
  loginContoller,
  logoutContoller,
  getCurrentUserController,
  renewalSubContoller,
  uploadAvatarContoller,
};
