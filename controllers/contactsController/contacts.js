import Contact from "../../models/contacts.js";
import HttpErrorCreator from "../../helpers/HttpErrorCreator.js";

export async function listContacts(req, res) {
  const { _id: owner } = req.user;
  console.log(req.query);
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.json(contacts);
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const searchContact = await Contact.findById(contactId);
  if (!searchContact) {
    throw HttpErrorCreator(404);
  }
  res.json(searchContact);
}

export async function addContact(req, res) {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
}

export async function removeContact(req, res) {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpErrorCreator(404);
  }
  res.json({ message: "Contact deleted" });
}

export async function updateContact(req, res) {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpErrorCreator(404);
  }
  res.json(updatedContact);
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
