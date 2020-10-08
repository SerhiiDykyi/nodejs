const UserDB = require('./auth.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const { createVerificationToken } = require('../../services/token.service');
const {
  madeAvatar,
  createAvatarUrl,
} = require('../../services/avatar.services');

const registrationContoller = async (req, res, next) => {
  try {
    const { body } = req;

    const hachedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      password: hachedPassword,
    });
    const currenUserById = await UserDB.findUserById(newUser._id);
    madeAvatar(newUser._id);
    const currenUserWithAvatar = await UserDB.updateUser(currenUserById._id, {
      avatarURL: createAvatarUrl(newUser._id),
    });
    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        avatarURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.IMAGE_FOLDER}/${currenUserWithAvatar.id}.png`,
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
    const avatarURL = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.IMAGE_FOLDER}/${file.filename}`;
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
