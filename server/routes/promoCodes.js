const { createPromoCode, checkPromoCode, getAllCodes } = require("../controllers/PromoCodeController")
const express = require("express")

const router = new express.Router()


router.post("/new", createPromoCode)

router.post("/check", checkPromoCode)

router.get("/codes", getAllCodes)



module.exports = router