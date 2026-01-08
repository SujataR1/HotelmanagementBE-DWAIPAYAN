const express = require("express");
const router = express.Router();
const Otp=require("./models/otpmodels");
const {otp_generation}=require("./utils/otp");
const {sendMailOtp}=require("./utils/email");

router.post("/send-otp",async (req,res)=>{
const {email,phone}=req.body;
const otp=otp_generation();
console.log(otp.email , otp.otp);
await Otp.create({ email, otp });
await sendMailOtp(email,otp);
res.status(201).json({message:"OTP has been sucessfully send to your email "});
});

router.post("/verify-otp",async (req,res)=>{
  const { email, otp } = req.body;
    const record = await Otp.findOne({ email, otp });
    if(!record) return res.status(400).json({ message: "Invalid OTP" });
    await Otp.deleteOne({ email:record.email }); 
    res.json({ message: "OTP verified successfully" });
});
module.exports=router;