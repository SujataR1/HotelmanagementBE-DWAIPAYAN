const bcrypt=require('bcrypt');
const User = require("../models/userModel");
const {generateToken}=require("../utils/jwtToken");
module.exports.customerlogin=async(req,res)=>{
  try {
    const { Email, Phoneno, Password } = req.body;
    if (!Email || !Phoneno || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ Email, Phoneno });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const jwt_token = generateToken(user);
    
    return res.status(200).json({
      message: "Login successful",
      Id: user._id.toString(),
      Email: user.Email,
      RoleType: user.RoleType,
      Token:jwt_token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
};
