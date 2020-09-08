const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = await contacts.find(
    (contact) => contact.id === contactId
  );
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const result = contacts.filter((contact) => contact.id !== contactId);
  const resultAsJSON = JSON.stringify(result);
  await fs.writeFile(contactsPath, resultAsJSON);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = contacts.length ? [...contacts].pop().id + 1 : 1;
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  const contactAsJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactAsJSON);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
