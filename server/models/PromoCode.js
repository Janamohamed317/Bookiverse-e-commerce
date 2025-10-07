const mongoose = require("mongoose")
const Joi = require("joi");
const { nanoid } = require('nanoid');

const PromoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        default: () => "BKV-" + nanoid(4),
    },
    startDate:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate:
    {
        type: Date,
        required: true,
        default: function () {
            return new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        }
    },
    isValid:
    {
        required: true,
        type: Boolean,
        default: true,
    },
    amount:
    {
        type: Number,
        required: true
    }
}, { timestamps: true }
)

const PromoCode = mongoose.model("PromoCode", PromoCodeSchema)

function ValidateCodeCreation(obj) {
    const schema = Joi.object({
        code: Joi.string().min(6),
        startDate: Joi.date(),
        endDate: Joi.date(),
        isValid: Joi.boolean(),
        amount: Joi.number().required()
    })

    return schema.validate(obj)
}


module.exports = {
    PromoCode,
    ValidateCodeCreation,
}