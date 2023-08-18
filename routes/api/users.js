import express from "express";
import usersControllers from "../../controllers/usersController/index.js";
import { validateRequestBody } from "../../helpers/validation.js";
import {
  userSignupSchema,
  userLogInSchema,
  userUpdateSubscription,
} from "../../helpers/schema.js";
import autorizationUser from "../../auth/auth.js";

const router = express.Router();

router.post(
  "/signup",
  validateRequestBody(userSignupSchema),
  usersControllers.createNewUser
);

router.post(
  "/login",
  validateRequestBody(userLogInSchema),
  usersControllers.logIn
);

router.get("/current", autorizationUser, usersControllers.getCurrentUser);

router.post("/logout", autorizationUser, usersControllers.logOut);

router.patch(
  "/",
  autorizationUser,
  validateRequestBody(userUpdateSubscription),
  usersControllers.updateUserSubscription
);

export default router;
