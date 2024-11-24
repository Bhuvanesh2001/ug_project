'use client';
import Link from "next/link";
import { useState } from "react";

const OtpVerificationPage = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [userOtp, setUserOtp] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const sendOtp = async () => {
        const generatedOtp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        setOtp(generatedOtp);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp: otp }),
      });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Failed to send OTP. Please try again.");
        }
    };

    const verifyOtp = () => {
        if (userOtp === otp) {
            setMessage("OTP Verified Successfully!");
        } else {
            setMessage("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    OTP Verification
                </h1>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="phone"
                    >
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="+1XXXXXXXXXX"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <button
                    onClick={sendOtp}
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition mb-6"
                >
                    Send OTP
                </button>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="otp"
                    >
                        Enter OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={userOtp}
                        onChange={(e) => setUserOtp(e.target.value)}
                    />
                </div>

                <button
                    onClick={verifyOtp}
                    className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition"
                >
                    <Link href="../TextConvertion">Verify OTP</Link>
                </button>

                {message && (
                    <p className="text-center mt-4 text-sm font-medium text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OtpVerificationPage;
