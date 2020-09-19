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

const gerContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await ContactDB.getContactsById(contactId);
    if (!contactById) {
      return res.status(400).json({ message: 'Not found' });
    }
    res.json(contactById);
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
    res.status(400).json({ message: 'missing required name field' });

    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    console.log(id);
    console.log(data);
    const updatedContact = await ContactDB.updateContact(id, data);
    if (!updatedContact) {
      res.status(400).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await ContactDB.deleteContact(contactId);
    if (!deleteContact) {
      res.status(400).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  gerContactController,
  gerContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
};
