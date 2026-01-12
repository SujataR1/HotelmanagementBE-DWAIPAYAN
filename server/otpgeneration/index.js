const express = require("express");
const router = express.Router();
const Otp=require("./models/otpmodels");
const {otp_generation}=require("./utils/otp");
const {sendMailOtp}=require("./utils/email");

router.post("/send-otp",async (req,res)=>{
try {
    // 🔧 CHANGE 1: Normalize email
    const email = req.body.email.toLowerCase().trim();

    // 🔧 CHANGE 2: Basic validation
    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const otp = otp_generation();

    // 🔧 CHANGE 3: Remove old OTP (avoid reuse)
    await Otp.findOneAndDelete({ email });

    console.log(email, otp);

    // 🔧 CHANGE 4: Save OTP with normalized email
    await Otp.create({ email, otp });

    // 🔧 CHANGE 5: Send OTP email
    await sendMailOtp(email, otp);

    return res.status(201).json({
      message: "OTP has been successfully sent to your email"
    });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      message: "Failed to send OTP"
    });
  }
});

router.post("/verify-otp",async (req,res)=>{
 try {
    // 🔧 CHANGE 6: Normalize email
    const email = req.body.email.toLowerCase().trim();
    const { otp } = req.body;

    // 🔧 CHANGE 7: Validate inputs
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    // 🔧 CHANGE 8: Single DB query (no duplicate queries)
    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        message: "OTP expired or not found"
      });
    }

    // 🔧 CHANGE 9: Compare OTP manually
    if (otpData.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // 🔧 CHANGE 10: Mark OTP as verified
    otpData.isVerified = true;
    await otpData.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      message: "OTP verification failed"
    });
  }
});
module.exports=router;
