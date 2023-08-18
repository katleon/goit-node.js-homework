import { Schema, model } from "mongoose";
import { handleMongooseError, handleRunValidators } from "./hooks.js";

const contact = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Contact email is required"],
  },
  phone: {
    type: String,
    required: [true, "Contact phone is required"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contact.pre("findOneAndUpdate", handleRunValidators);

contact.post("save", handleMongooseError);

contact.post("findOneAndUpdate", handleMongooseError);

const Contact = model("contact", contact);

export default Contact;
