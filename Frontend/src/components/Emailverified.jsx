import { useState } from "react";
import toast from "react-hot-toast";

export default function Emailverified({ isOpen, onClose, onVerify }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    
    if (!isOpen) return null;

    const handleSendCode = async () => {
        if (!email) return;

        setLoading(true);
        setError("");

        try {
            
            const response = await fetch("http://localhost:3000/api/v1/sendOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Verification code sent! Please check your email.");
                if (onVerify) onVerify(email); 
            } else {
                setError(data.message || "Failed to send OTP. Try again.");
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

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter your email</h2>
                    <p className="text-gray-600 text-sm mb-6">We'll send you a verification code to get started.</p>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="block w-full bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* ✅ Error message */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            onClick={handleSendCode}
                            disabled={!email || loading}
                            className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                email && !loading
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {loading ? "Sending..." : "Send Verification Code"}
                        </button>

                        <button onClick={onClose} className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50">
                            Cancel
                        </button>
                        {}
                    </div>
                </div>
            </div>
        </>
    );
}