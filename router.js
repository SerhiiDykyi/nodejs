const { Router } = require('express');
const contactsRouter = Router();
const shortid = require('shortid');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('./contacts');

contactsRouter.get('/', async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

contactsRouter.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const id = shortid();
    const contact = await addContact(id, name, email, phone);
    res.status(201).json(contact);
    return;
  }
  res.status(400).json({ message: 'missing required name field' });
});

contactsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const contactById = await getContactById(id);
  if (contactById) {
    await removeContact(id);
    res.status(200).json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

contactsRouter.patch('/:id', async (req, res) => {
  const { id, name, email, phone } = req.body;
  const contactById = await updateContact(id, name, email, phone);
  // console.log(contactById);
  if (!contactById) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  // if (name && email && phone) {
  //   const contact = await updateContact(id, name, email, phone);
  //   res.status(200).json(contact);
  //   return;
  // }
  // res.status(400).json({ message: 'missing fields' });
});

module.exports = contactsRouter;
