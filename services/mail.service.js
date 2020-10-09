require('dotenv').config();
const sgMail = require('@sendgrid/mail');
// const { createEmailToken } = require('./token.service');
// const token = createEmailToken();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, token) => {
  try {
    const msg = {
      to: `${email}`, // Change to your recipient
      from: 'vankyverd@gmail.com', // Change to your verified sender
      subject: 'GoIT NDJS-18 verification account',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<a href="http://localhost:3000/auth/verify/${token}">You need verefy email!!!<a>`,
    };
    const res = await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
