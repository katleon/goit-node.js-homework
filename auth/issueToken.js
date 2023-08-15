const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_TOKEN = process.env.JWT_KEY;

const issueToken = (user) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_TOKEN);
  return token;
};

module.exports = issueToken;
