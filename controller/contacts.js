const Contact = require("../models/contacts.js");

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getContactById(contactId) {
  const foundContact = await Contact.findById(contactId);
  return foundContact;
}

async function addContact(body) {
  const { name, email, phone } = body;
  const contact = new Contact({ name, email, phone });
  await contact.save();
  return contact;
}

async function removeContact(contactId) {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(contactId, body) {
  try {
    return await Contact.findByIdAndUpdate(contactId, body);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
