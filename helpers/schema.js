import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(22).required(),
});

export const changeContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(22),
}).or("name", "email", "phone");

export const patchContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userLogInSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

export const userUpdateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().required(),
});

export default {
  changeContactSchema,
  addContactSchema,
  patchContactSchema,
  userSignupSchema,
  userLogInSchema,
  userUpdateSubscription,
  userEmailSchema,
};
