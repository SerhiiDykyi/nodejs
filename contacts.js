const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, {
    encoding: 'utf-8',
  });
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = await contacts.find(contact => contact.id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const result = contacts.filter(contact => contact.id !== contactId);
  const resultAsJSON = JSON.stringify(result);
  await fs.writeFile(contactsPath, resultAsJSON);
}

async function addContact(id, name, email, phone) {
  const contacts = await listContacts();
  const id = shortid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  const contactAsJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactAsJSON);
  return newContact;
}

async function updateContact(id, body) {
  const contacts = await listContacts();
  const indexById = await contacts.findIndex(contact => contact.id === id);
  contacts[indexById] = {
    ...contacts[indexById],
    ...body,
  };
  const contactAsJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactAsJSON);
  return contacts[indexById];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
