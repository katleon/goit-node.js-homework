import { Schema, model } from "mongoose";
import { handleMongooseError, handleRunValidators } from "./hooks.js";

const user = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

user.pre("findOneAndUpdate", handleRunValidators);

user.post("save", handleMongooseError);

user.post("findOneAndUpdate", handleMongooseError);

const User = model("user", user);

export default User;
