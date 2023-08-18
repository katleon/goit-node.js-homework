import express from "express";
import contactsControllers from "../../controllers/contactsController/index.js";
import { validateRequestBody, validateId } from "../../helpers/validation.js";

import {
  changeContactSchema,
  addContactSchema,
  patchContactSchema,
} from "../../helpers/schema.js";
import autorizationUser from "../../auth/auth.js";

const router = express.Router();

router.use(autorizationUser);

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", validateId, contactsControllers.getContactById);

router.post(
  "/",
  validateRequestBody(addContactSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", validateId, contactsControllers.removeContact);

router.put(
  "/:contactId",
  validateId,
  validateRequestBody(changeContactSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateRequestBody(patchContactSchema),
  contactsControllers.updateContact
);
export default router;
