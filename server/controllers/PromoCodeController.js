const { date } = require("joi");
const { PromoCode, ValidateCodeCreation } = require("../models/PromoCode")
const asyncHandler = require("express-async-handler");
const { validatePromoCode } = require("../utils/PromoCodeValidation");
const { sendEmail } = require("../utils/MailSender");


const createPromoCode = asyncHandler(async (req, res) => {
    const { error } = ValidateCodeCreation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { code, startDate, endDate, amount } = req.body || {}
    let promoCode, newPromoCode
    if (code) {
        promoCode = await PromoCode.findOne({ code })
        if (promoCode) {
            return res.status(409).json({ message: "Code Already Exist" })
        }
        newPromoCode = new PromoCode({
            code,
            startDate,
            endDate,
            amount
        })
    }
    else {
        newPromoCode = new PromoCode({
            startDate,
            endDate,
            amount
        })
    }

    await newPromoCode.save()
    return res.status(200).json({ message: "Promo Code Created" })
})

const checkPromoCode = asyncHandler(async (req, res) => {
    const { code, userId } = req.body
    const promoCode = await validatePromoCode(code, userId)
    return res.status(200).json({ message: "Promo Code is Valid", amount: promoCode.amount })
})

const getAllCodes = asyncHandler(async (req, res) => {
    const codes = await PromoCode.find()
    return res.status(200).json(codes)
})

const deleteCode = asyncHandler(async (req, res) => {
    const { id } = req.params
    await PromoCode.findByIdAndDelete(id)
    return res.status(200).json({ message: "Promo Code Deleted" })
})

const sendPromoCode = asyncHandler(async (req, res) => {
    const { email } = req.body

    const promoCode = await PromoCode.findOne({ code: "Welcome20" })
    await sendEmail("Welcome to Bookiverse", email,
        `Welcome to Bookiverse, here is a 20% discount on your First Order use that PromoCode ${promoCode.code}`)

    return res.status(200)
})


module.exports =
{
    sendPromoCode,
    deleteCode,
    createPromoCode,
    checkPromoCode,
    getAllCodes,
}
