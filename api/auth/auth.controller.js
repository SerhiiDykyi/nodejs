const UserDB = require('./auth.model');
const bcrypt = require('bcrypt');
const { createVerificationToken } = require('../../services/token.service');

const registrationContoller = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      password: hashedPassword,
    });
    res.status(201).json({
      user: {
        email: body.email,
        subscription: body.subscription,
      },
    });
  } catch (error) {
    console.log('error.message:', error.name);
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
      return res
        .status(404)
        .json({ message: `missing required ${email} field` });
    }
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      return res.status(404).json({ message: `Wrong password` });
    }
    const access_token = await createVerificationToken({ id: user._id });
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

module.exports = {
  registrationContoller,
  loginContoller,
};
