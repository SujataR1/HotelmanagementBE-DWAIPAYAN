require("dotenv").config();
const jwt = require("jsonwebtoken");  

const generateToken = (user) => {
  return jwt.sign(
    { id: user.userId },                 
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

module.exports = { generateToken };  
