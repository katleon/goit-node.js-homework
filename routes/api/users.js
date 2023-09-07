import express from "express";
import usersControllers from "../../controllers/usersController/index.js";
import { validateRequestBody } from "../../helpers/validation.js";
import {
  userSignupSchema,
  userLogInSchema,
  userUpdateSubscription,
  userEmailSchema,
} from "../../helpers/schema.js";
import autorizationUser from "../../auth/auth.js";
import upload from "../../helpers/upload.js";

const router = express.Router();

router.post(
  "/signup",
  validateRequestBody(userSignupSchema),
  usersControllers.createNewUser
);

router.get("/verify/:verificationToken", usersControllers.verifyEmail);

router.post(
  "/verify",
  validateRequestBody(userEmailSchema),
  usersControllers.resendEmail
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

router.patch(
  "/avatars",
  autorizationUser,
  upload.single("avatar"),
  usersControllers.updateAvatars
);

export default router;
