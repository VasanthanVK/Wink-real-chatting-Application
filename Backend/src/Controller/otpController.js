
import nodemailer from "nodemailer";import dotenv from "dotenv";    
import { Otp } from "../Model/OtpModel.js";
import { generateOTP, transporter } from "../utils/Nodemailer.js";

dotenv.config();


// ─── Send OTP ────────────────────────────────────────────────

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    // Store OTP with expiry
    await Otp.create({ Email: email, otp ,expiresAt}); // Save to DB for persistence

    // Send email
    await transporter.sendMail({
      from: `"Wink Chatting" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your OTP Code</h2>
          <p>Use the OTP below to verify your identity:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};


// ─── Verify OTP ───────────────────────────────────────────────
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // ✅ await added
  const record = await Otp.findOne({ Email: email });
  console.log(record);
  

  if (!record) {
    return res.status(400).json({ message: "OTP not found. Please request a new one." });
  }

  if (Date.now() > record.expiresAt) {
    await Otp.deleteOne({ Email: email }); // ✅ otp தேவையில்ல இங்க
    return res.status(400).json({ message: "OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await Otp.updateOne({ Email: email }, { $set: { otp: null , verified:true } });

  // // ✅ expiresAt variable-ஆ pass பண்ண வேண்டாம்
  // await Otp.deleteOne({ Email: email });

  return res.status(200).json({ message: "OTP verified successfully" });
};
