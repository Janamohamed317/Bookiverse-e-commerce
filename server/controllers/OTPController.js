const asyncHandler = require("express-async-handler")
const otpGenerator = require('otp-generator');
const { User } = require("../models/User")
const { OTP } = require("../models/OTP");
const { sendEmail } = require("../utils/MailSender");
const bcrypt = require('bcryptjs');

const generateOTP = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    if (user.verified) {
        return res.status(400).json({ message: "User is already verified" })
    }

    await OTP.deleteMany({ email })
    const NewOTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const hashedOTP = await bcrypt.hash(NewOTP, 10)
    const otp = new OTP(
        {
            email,
            otp: hashedOTP,
        }
    )
    await otp.save()
    await sendEmail("Email Verification", email, `<p>Your OTP is ${NewOTP}</p>`)

    return res.status(200).json({ message: "OTP Sent to Your Email", otp })
})


const verifyOTP = asyncHandler(async (req, res) => {
    const { otp, email } = req.body
    const existingOTP = await OTP.findOne({ email })

    if (!existingOTP) {
        return res.status(404).json({ message: "OTP is expired or not for that User" })
    }
    const isValid = await bcrypt.compare(otp, existingOTP.otp);
    if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email })
    user.verified = true
    await user.save()

    await OTP.deleteOne({ email });

    return res.status(200).json({ message: "Email verified successfully" });
})


module.exports = {
    generateOTP,
    verifyOTP
}
