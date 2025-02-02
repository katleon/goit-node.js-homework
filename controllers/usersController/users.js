import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

import User from "../../models/user.js";
import HttpErrorCreator from "../../helpers/HttpErrorCreator.js";
import sendEmail from "../../helpers/sendEmail.js";

const JWT_TOKEN = process.env.JWT_KEY;

export async function createNewUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrorCreator(409, "Email in use");
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmailMessage = {
    to: email,
    subject: "Please, verify your email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmailMessage);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
}

export async function logIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrorCreator(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpErrorCreator(401, "Please verify your email before logging in.");
  }
  const userPassword = await bcryptjs.compare(password, user.password);
  if (!userPassword) {
    throw HttpErrorCreator(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_TOKEN, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
}

export function getCurrentUser(req, res) {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
}

export async function updateUserSubscription(req, res) {
  const { subscription } = req.body;

  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    user: {
      email: user.email,
      subscription,
    },
  });
}

export async function logOut(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
}

export async function updateAvatars(req, res, next) {
  const { _id } = req.user;
  const { path: tmpPath, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const avatarsPath = path.resolve("public", "avatars", fileName);
  const avatarURL = path.join("avatars", fileName);
  try {
    const image = await Jimp.read(tmpPath);
    await image.resize(250, 250);
    await image.writeAsync(tmpPath);

    await fs.rename(tmpPath, avatarsPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return next(error);
  }

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
}

export default {
  createNewUser,
  logIn,
  getCurrentUser,
  updateUserSubscription,
  logOut,
  updateAvatars,
};
