const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const foundContact = contactsList.find((contact) => contact.id === contactId);
  return foundContact;
}

async function addContact(body) {
  const contactsList = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const filteredContacts = JSON.stringify(
    contactsList.filter((contact) => contact.id !== contactId)
  );
  await fs.writeFile(contactsPath, filteredContacts);
}

async function updateContact(contactId, body) {
  const contactsList = await listContacts();

  const editedContactList = contactsList.map((contact) => {
    if (contact.id === contactId) {
      const editedContact = {
        id: contact.id,
        name: body.name ? body.name : contact.name,
        email: body.email ? body.email : contact.email,
        phone: body.phone ? body.phone : contact.phone,
      };

      return editedContact;
    } else {
      return contact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(editedContactList));

  return editedContactList.find((contact) => contact.id === contactId);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
