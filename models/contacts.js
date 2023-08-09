const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contacts);

module.exports = Contact;
