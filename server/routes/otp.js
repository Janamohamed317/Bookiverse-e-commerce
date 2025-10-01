const { generateOTP, verifyOTP } = require("../controllers/OTPController")
const express = require("express");


const router = express.Router();

router.post("/sendOTP", generateOTP)

router.post("/verifyOTP", verifyOTP)


module.exports = router