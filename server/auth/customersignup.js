const User = require("../models/userModel");
const Otp=require("../otpgeneration/models/otpmodels")
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

    /* ================= 1️⃣ Required Field Validation ================= */
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !address ||
      !preferences ||
      !emergencyContact
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    /* ================= 2️⃣ Normalize Email ================= */
    const normalizedEmail = email.toLowerCase().trim();

    /* ================= 3️⃣ Email Already Exists Check ================= */
    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    /* ================= 4️⃣ OTP Verification Check ================= */
    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      isVerified: true
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Please verify OTP first"
      });
    }

    /* ================= 5️⃣ Phone Number Uniqueness ================= */
    const existingPhone = await User.findOne({
      "phone.number": phone.number
    });

    if (existingPhone) {
      return res.status(409).json({
        message: "Phone number already exists"
      });
    }

    /* ================= 6️⃣ Create User ================= */
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      password, // hashed by model middleware
      dateOfBirth,
      gender,
      address,
      preferences,
      corporateBooking,
      emergencyContact,
      accessibility,
      roleType: roleType || "CUSTOMER"
    });

    /* ================= 7️⃣ Delete OTP After Successful Signup ================= */
    await Otp.deleteOne({ email: normalizedEmail });

    /* ================= 8️⃣ Success Response ================= */
    return res.status(201).json({
      message: "User registered successfully",
      userId: user.userId
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Signup failed"
    });
  }
};
