import React, { useState } from 'react'
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/components/ui/input-otp"
import Emailverified from './Emailverified';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Inputotp({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ useEffect பூரா எடுத்துட்டோம் — button click-லயே API call போகுது

  // ✅ Early return hooks-க்கு கீழே இருக்கு இப்போ
  if (!isOpen) return null;

  const verifyOTP = async () => {
    if (otp.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified successfully");
        onClose(); 
        toast.success("Email verified successfully! Redirecting to signup...");
        setTimeout(() => {
            navigate("/emailverified/otpverified/signup");
        }, 3000);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
          
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 text-sm mb-2">We've sent a 6-digit code to</p>
          <p className="text-gray-900 font-semibold mb-6">{email}</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter Verification Code
              </label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* ✅ Error message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="text-center text-sm text-gray-600">
              <p>Didn't receive a code?{" "}
                <button className="text-violet-600 hover:text-violet-700 font-semibold">Resend</button>
              </p>
            </div>

            {/* ✅ verifyOTP function call பண்றோம் */}
            <button
              onClick={verifyOTP}
              disabled={otp.length !== 6 || loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                otp.length === 6 && !loading
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <button onClick={onClose} className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Cancel
            </button>
        
          </div>
        </div>
      </div>
    </>
  );
}

export default Inputotp;