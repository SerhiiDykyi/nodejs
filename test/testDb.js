require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../api/auth/auth.model');

it('Connection mongo test', done => {
  mongoose.connect(process.env.DB_URI, err => {
    if (err) done(err);
    done();
  });
});

it('Create user test', done => {
  try {
    const fakeNewUser = {
      email: 'testMocha3@gmail.com',
      password: 'qwerty123',
    };
    User.createUser(fakeNewUser).then(createUser => {
      if (createUser._id) done();
    });
  } catch (error) {
    done(error);
  }
});

it('Create user test with invalid data', done => {
  const fakeNewUser = {
    login: 'testMocha3@gmail.com',
    password: 'qwerty123',
  };
  User.createUser(fakeNewUser)
    .then(createUser => {
      if (createUser._id) done(new Error('Data must been valid'));
    })
    .catch(error => done());
});
