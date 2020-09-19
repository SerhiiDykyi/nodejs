const { Router } = require('express');
const contactsRouter = Router();

const {
  gerContactController,
  gerContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require('./contacts.controller');
contactsRouter.get('/', gerContactController);
contactsRouter.get('/:contactId', gerContactByIdController);
contactsRouter.post('/', createContactController);
contactsRouter.patch('/', updateContactController);
contactsRouter.delete('/:contactId', deleteContactController);

// contactsRouter.post('/', async (req, res) => {
//   const { body } = req;
//   const { name, email, phone } = body;
//   if (name && email && phone) {
//     const contact = await addContact(body);
//     res.status(201).json(contact);
//     return;
//   }
//   res.status(400).json({ message: 'missing required name field' });
//   return;
// });

// contactsRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const contact = await getContactById(id);
//   if (contact) {
//     await removeContact(id);
//     res.status(200).json({ message: 'contact deleted' });
//     return;
//   }
//   res.status(400).json({ message: 'Not found' });
//   return;
// });

// contactsRouter.patch('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   const contact = await getContactById(id);
//   if (!contact) {
//     res.status(404).json({ message: 'Not found' });
//     return;
//   }

//   for (const key in req.body) {
//     if (key) {
//       const contactUpdate = await updateContact(id, body);
//       res.status(201).json(contactUpdate);
//       return;
//     }
//   }
//   res.status(201).json({ message: 'missing fields' });
//   return;
// }

// );

module.exports = contactsRouter;
