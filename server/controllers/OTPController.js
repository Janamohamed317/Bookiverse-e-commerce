const asyncHandler = require("express-async-handler")
const { customAlphabet } = require('nanoid');
const { User } = require("../models/User")
const { OTP, validateSchema } = require("../models/OTP");
const { sendEmail } = require("../utils/MailSender");
const bcrypt = require('bcryptjs');

const generateOTP = asyncHandler(async (req, res) => {
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    if (user.verified) {
        return res.status(400).json({ message: "User is already verified" })
    }

    await OTP.deleteMany({ email })

    const digits = '0123456789';
    const generateOTPCode = customAlphabet(digits, 6);
    const NewOTP = generateOTPCode(); 
    const hashedOTP = await bcrypt.hash(NewOTP, 10);

    const otp = new OTP(
        {
            email,
            otp: hashedOTP,
        }
    )
    await otp.save()
    await sendEmail("Email Verification", email, `<p>Your OTP is ${NewOTP}</p>`)

    return res.status(200).json({ message: "OTP Sent to Your Email" })
})


const verifyOTP = asyncHandler(async (req, res) => {
    const { otp, email } = req.body
    const existingOTP = await OTP.findOne({ email })

    if (!existingOTP) {
        return res.status(404).json({ message: "OTP is Expired" })
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
