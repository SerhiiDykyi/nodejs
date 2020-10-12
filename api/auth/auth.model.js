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
    avatarURL: {
      type: String,
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

  createUser = async userData => {
    return await this.db.create(userData);
  };

  findUserByEmail = async query => {
    return await this.db.findOne(query);
  };

  updateUser = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData, {
      new: true,
    });
  };

  findUserById = async userId => {
    return await this.db.findById(userId);
  };
}

module.exports = new User();
