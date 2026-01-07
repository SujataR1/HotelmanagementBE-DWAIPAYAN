const express = require("express");
const router = express.Router();
const User = require("../models/userModel");


router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users
  });
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

module.exports = router;