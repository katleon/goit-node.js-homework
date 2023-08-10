const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(22).required(),
});

const changeContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(22),
}).or("name", "email", "phone");

const pathContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  putValidate: changeContactSchema,
  postValidate: addContactSchema,
  patchValidate: pathContactSchema,
};
