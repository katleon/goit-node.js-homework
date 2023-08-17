import jwt from "jsonwebtoken";

import HttpErrorCreator from "../helpers/HttpErrorCreator.js";
import User from "../models/user.js";
import controllerDecorator from "../helpers/controllerDecorator.js";

const JWT_TOKEN = process.env.JWT_KEY;

async function autorizationUser(req, res, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpErrorCreator(401);
  }
  try {
    const { id } = jwt.verify(token, JWT_TOKEN);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpErrorCreator(401);
    }
    req.user = user;
    next();
  } catch {
    throw HttpErrorCreator(401);
  }
}

export default controllerDecorator(autorizationUser);
