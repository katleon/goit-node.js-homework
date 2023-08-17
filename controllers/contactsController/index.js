import controllerDecorator from "../../helpers/controllerDecorator.js";

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "./contacts.js";

export default {
  listContacts: controllerDecorator(listContacts),
  getContactById: controllerDecorator(getContactById),
  addContact: controllerDecorator(addContact),
  removeContact: controllerDecorator(removeContact),
  updateContact: controllerDecorator(updateContact),
};
