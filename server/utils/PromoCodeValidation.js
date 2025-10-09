const { PromoCode } = require("../models/PromoCode")
const { User } = require("../models/User")

const validatePromoCode = async (code, userId) => {
    const promoCode = await PromoCode.findOne({ code })
    if (!promoCode) {
        throw new Error("Invalid Promo Code")
    }

    if (promoCode.endDate !== null && promoCode.endDate.getTime() < Date.now()) {
        throw new Error("Promo Code Expired")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new Error("User Not Found")
    }

    for (const c of user.codes) {
        if (c.code.equals(promoCode._id)) {
            throw new Error("Promo Code has been used before")
        }
    }

    return promoCode

}

module.exports = { validatePromoCode }