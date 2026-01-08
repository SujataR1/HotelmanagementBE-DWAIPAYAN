// const bcrypt=require('bcrypt');
// const User = require("../models/userModel");
// const uuid=require("uuid");
// module.exports.customersignup=async(req,res,next)=>{
//   try {
//     const { Name, Email, Phoneno, Password, RoleType } = req.body;

//     const existingEmail = await User.findOne({ Email });
//     if (existingEmail)
//       return res.status(400).json({ message: "Email already exists" });

//     const existingPhone = await User.findOne({ Phoneno });
//     if (existingPhone)
//       return res.status(400).json({ message: "Phone already exists" });

//     const user = await User.create({
//       Name,
//       Email,
//       Phoneno,
//       Password,
//       RoleType
//     });

//     return res.status(201).json({ 
//       message: "User registered successfully",
//       userId:user.userId
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Signup failed" });
//   }
// };


const User = require("../models/userModel");

module.exports.customersignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      preferences,
      corporateBooking,
      emergencyContact,
      accessibility,
      roleType
    } = req.body;

    // 1️⃣ Basic required validation
    if (
      !firstName || !lastName || !email || !phone ||
      !password || !address || !preferences || !emergencyContact
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    // 2️⃣ Email check
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3️⃣ Phone check
    const existingPhone = await User.findOne({
      "phone.number": phone.number
    });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // 4️⃣ Create user (ALL DATA AT ONCE)
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      preferences,
      corporateBooking,
      emergencyContact,
      accessibility,
      roleType: roleType || "CUSTOMER"
    });

    // 5️⃣ Success response
    return res.status(201).json({
      message: "User registered successfully",
      userId: user.userId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Signup failed" });
  }
};
