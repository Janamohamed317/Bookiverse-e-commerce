import { useState } from "react"
import { useLocation } from "react-router"
import useVerifyOTP from "../../hooks/Auth/useVerifyOTP"
import { sendOTP } from "../../services/AuthServices"

const OTP = () => {
    const location = useLocation()
    const { email } = location?.state || {}
    const [otp, setOtp] = useState("") 

    const verifyOTP = useVerifyOTP(otp, email)

    return (
        <div className="flex min-h-screen items-center justify-center">
            {email ?
                <div className="w-full max-w-md rounded-2xl  bg-[#2B2118]/30 backdrop-blur-md p-6 
              border border-[#6C584C]/90 shadow-lg text-center text-white">
                    <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
                    <p className="mb-6 text-gray-300">
                        We’ve sent a OTP to <span className="font-medium">{email}</span>
                    </p>

                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-center text-lg tracking-widest
                     focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
                    />

                    <p className="text-sm text-gray-400 mb-6">
                        Didn’t receive the OTP?{" "}
                        <button
                            onClick={() => sendOTP(email)}
                            className="text-amber-400 hover:text-amber-300 underline"
                        >
                            Send Again
                        </button>
                    </p>

                    <button
                        onClick={() => verifyOTP.mutate()}
                        className="w-full rounded-lg 
                    bg-[#D4A373] text-[#2B2118] font-semibold  p-2
                     hover:bg-[#E5B185] cursor-pointer"
                    >
                        Verify OTP
                    </button>
                </div> :
                <p className="text-white">No OTP is Sent</p>
            }
        </div>
    )
}

export default OTP
