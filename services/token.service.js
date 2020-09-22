const jwt = require('jsonwebtoken');

const createVerificationToken = async payload => {
  return await jwt.sign(payload, process.env.ACCESS_KEY);
};

const verfyToken = async token => {
  return await jwt.verify(token, process.env.ACCESS_KEY);
};

module.exports = { createVerificationToken, verfyToken };
