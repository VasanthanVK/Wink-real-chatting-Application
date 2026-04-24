import nodemailer from "nodemailer";
import dotenv from "dotenv";    

dotenv.config();

// Temporary OTP store (use Redis or DB in production)
const otpStore = {};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




// module.exports = { sendOTP, verifyOTP };