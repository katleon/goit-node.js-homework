const express = require("express");

const router = express.Router();

const { loginUser } = require("../../controller/users");

router.post("/login", async (req, res) => {
  console.log(req.body);

  try {
    const { message, code } = await loginUser(req.body);
    res.status(code).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
