const { createPromoCode, checkPromoCode, getAllCodes, deleteCode, sendPromoCode } = require("../controllers/PromoCodeController")
const { verifyTokenAndAdmin, verifyTokenAndUser } = require("../middlewares/verifyToken")
const express = require("express")

const router = new express.Router()


router.post("/new", verifyTokenAndAdmin, createPromoCode)

router.post("/check", checkPromoCode)

router.get("/codes", verifyTokenAndAdmin, getAllCodes)

router.delete("/delete/:id", verifyTokenAndAdmin, deleteCode)

router.post("/sendEmail", sendPromoCode)


module.exports = router