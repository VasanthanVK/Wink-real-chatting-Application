import { matchedData, validationResult } from "express-validator";
import { Register } from "../Model/RegisterModel.js";
import { comparePassword, hashPassword } from "../utils/Hashpassword.js";
import { Genrated_token } from "../Middleware/jwt.js";
import { Otp } from "../Model/OtpModel.js";

export const register = async (req, res) => {
  try {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
        error: validation.array(),
        message: "Validation failed",
      });
    }

    const { Name, Email, Password, Phone, Bio } = matchedData(req);

    // Check existing user
    const existingUser = await Register.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Null check பண்றோம்
    const otpRecord = await Otp.findOne({ Email });
    
    
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP record not found. Please verify your email." });
    }

    if (!otpRecord.verified) {
      return res.status(400).json({ message: "Please verify your email before registering" });
    }

    // Cleanup OTP
    await Otp.deleteOne({ Email });

    const Hashpassword = await hashPassword(Password);
    const profileImage = req.file ? req.file.filename : null;

    const newUser = new Register({
      profilePic: `http://localhost:3000/Upload/${profileImage}`,
      Name,
      Email,
      Password: Hashpassword,
      Phone,
      Bio,
    });

    await newUser.save();
    const token = Genrated_token(Email, Phone, newUser._id);

    return res.status(201).json({
      message: "User Registered",
      user: newUser,
      token,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
   
    const existingUser = await Register.findOne({ Email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email are invalid",
      });
    }

    const IsMatch = await comparePassword(Password, existingUser.Password);
    if (!IsMatch) {
      return res.status(400).json({
        message: "Password are Invalid",
      });
    }
    const token = Genrated_token(existingUser.Email, existingUser.Phone, existingUser._id);
    return res
      .status(200)
      .json({ message: "Sucessfully Login", user: existingUser, token: token });
  } catch (err) {
    return res.status(404).json({ message: "server error", err });
  }
};
