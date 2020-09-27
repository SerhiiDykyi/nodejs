const { Router } = require('express');
const contactsRouter = Router();

const {
  gerContactController,
  gerContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require('./contacts.controller');

const {
  checkAuthTokenMiddleware,
} = require('../../middlewares/auth.middleware');

contactsRouter.get('/', checkAuthTokenMiddleware, gerContactController);
contactsRouter.get('/:contactId', gerContactByIdController);
contactsRouter.post('/', createContactController);
contactsRouter.patch('/', updateContactController);
contactsRouter.delete('/:contactId', deleteContactController);

module.exports = contactsRouter;
