const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

class User {
  constructor() {
    this.db = mongoose.model('Users', userSchema);
  }

  // getContacts = async query => {
  //   return await this.db.find(query);
  // };

  // getContactsById = async userId => {
  //   return await this.db.findById(userId);
  // };

  createUser = async userData => {
    return await this.db.create(userData);
  };

  findUserByEmail = async query => {
    return await this.db.findOne(query);
  };

  findUserById = async userId => {
    return await this.db.findById(userId);
  };

  // updateContact = async (userId, userData) => {
  //   return await this.db.findByIdAndUpdate(userId, userData, {
  //     new: true,
  //   });
  // };

  // deleteContact = async userId => {
  //   return await this.db.findByIdAndRemove(userId);
  // };
}

module.exports = new User();
