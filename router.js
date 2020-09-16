const { Router } = require('express');
const contactsRouter = Router();

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
  res.status(400).json({ message: 'Not found' });
  return;
});

contactsRouter.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
    return;
  }
  res.status(400).json({ message: 'missing required name field' });
  return;
});

contactsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    await removeContact(id);
    res.status(200).json({ message: 'contact deleted' });
    return;
  }
  res.status(400).json({ message: 'Not found' });
  return;
});

contactsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  for (const key in req.body) {
    if (key) {
      const contactUpdate = await updateContact(id, req.body);
      res.status(201).json(contactUpdate);
      return;
    }
  }
  res.status(201).json({ message: 'missing fields' });
  return;
});

module.exports = contactsRouter;
