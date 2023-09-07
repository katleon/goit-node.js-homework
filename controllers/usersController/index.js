import controllerDecorator from "../../helpers/controllerDecorator.js";

import {
  createNewUser,
  logIn,
  getCurrentUser,
  updateUserSubscription,
  logOut,
  updateAvatars,
} from "./users.js";

import { verifyEmail, resendVerificationEmail } from "./verifyEmails.js";

export default {
  createNewUser: controllerDecorator(createNewUser),
  logIn: controllerDecorator(logIn),
  getCurrentUser: controllerDecorator(getCurrentUser),
  logOut: controllerDecorator(logOut),
  updateUserSubscription: controllerDecorator(updateUserSubscription),
  updateAvatars: controllerDecorator(updateAvatars),
  verifyEmail: controllerDecorator(verifyEmail),
  resendEmail: controllerDecorator(resendVerificationEmail),
};
