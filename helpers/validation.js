import isValidObjectId from "mongoose";

import HttpErrorCreator from "../helpers/HttpErrorCreator.js";

export function validateId(req, res, next) {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpErrorCreator(404, `${contactId} is not valid ID`));
  }
  next();
}

export function validateRequestBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpErrorCreator(400, error.message));
    }
    next();
  };
}

export default {
  validateId,
  validateRequestBody,
};
