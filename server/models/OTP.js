const mongoose = require("mongoose")
const Joi = require("joi");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    }
})

const OTP = mongoose.model("OTP", OTPSchema)

function validateSchema(obj) {
    const schema = Joi.object({
        email: Joi.string().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    OTP,
    validateSchema
}