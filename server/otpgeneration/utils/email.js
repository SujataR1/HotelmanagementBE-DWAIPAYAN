const nodemailer = require("nodemailer");

async function sendMailOtp(email, otp) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,          // smtp.hostinger.com
    port: Number(process.env.EMAIL_PORT),  // 465
    secure: true,                          // MUST be true for 465
    auth: {
      user: process.env.EMAIL_USER,        // team@transev.in
      pass: process.env.EMAIL_PASS         // mailbox password
    }
  });

  // 🔎 Verify SMTP connection
  await transporter.verify();

  await transporter.sendMail({
    from: `"OTP Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  });
}

module.exports = { sendMailOtp };
