const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validate: uuidValidate } = require('uuid');

const createVerificationToken = async payload => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async token => {
  const parsedToken = token.replace('Bearer ', '');
  return await jwt.verify(parsedToken, process.env.ACCESS_KEY);
};

const createEmailToken = () => {
  return uuidv4();
};

const checkEmailToken = token => {
  return uuidValidate(token);
};

module.exports = {
  createVerificationToken,
  verifyToken,
  createEmailToken,
  checkEmailToken,
};
