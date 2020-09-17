const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      default: 'NoName',
    },
    phone: {
      type: String,
      require: true,
      default: 'NoNumber',
    },
  },
  { versionKey: false },
);

class Contact {
  constructor() {
    this.db = mongoose.model('Contacts', contactSchema);
  }

  getContacts = async query => {
    return await this.db.find(query);
  };

  createContact = async contactData => {
    return await this.db.create(contactData);
  };

  updateContact = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  };

  deleteContact = async contactId => {
    return await this.db.findByIdAndRemove(contactId);
  };
}

module.exports = new Contact();
