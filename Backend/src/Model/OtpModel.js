import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
   otp: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);