import controllerDecorator from "../../helpers/controllerDecorator.js";

import {
  createNewUser,
  logIn,
  getCurrentUser,
  updateUserSubscription,
  logOut,
} from "./users.js";

export default {
  createNewUser: controllerDecorator(createNewUser),
  logIn: controllerDecorator(logIn),
  getCurrentUser: controllerDecorator(getCurrentUser),
  logOut: controllerDecorator(logOut),
  updateUserSubscription: controllerDecorator(updateUserSubscription),
};
