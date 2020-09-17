const ContactDB = require('./contacts.model');

const gerContactController = async (req, res, next) => {
  try {
    const { query } = req;
    const contacts = await ContactDB.getContacts(query);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactDB.createContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContact = await ContactDB.updateContact(id, data);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await ContactDB.deleteContact(contactId);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  gerContactController,
  createContactController,
  updateContactController,
  deleteContactController,
};
