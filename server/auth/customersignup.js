const bcrypt=require('bcrypt');
const User = require("../models/userModel");
const uuid=require("uuid");
module.exports.customersignup=async(req,res,next)=>{
  try {
    const { Name, Email, Phoneno, Password, RoleType } = req.body;

    const existingEmail = await User.findOne({ Email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingPhone = await User.findOne({ Phoneno });
    if (existingPhone)
      return res.status(400).json({ message: "Phone already exists" });

    const user = await User.create({
      Name,
      Email,
      Phoneno,
      Password,
      RoleType
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signup failed" });
  }
};
