const { getTotalProfit, getMonthlyProfit,
    getOrdersCount, getMonthlyOrdersCount, 
    getUsersCount,
    getTopSalesBooks} = require("../controllers/StatisticsController")
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const express = require("express")


const router = express.Router()

// get tota lProfit
router.get("/profit/totalProfit", verifyTokenAndAdmin, getTotalProfit)

// get Monthly Profit
router.get("/profit/monthlyProfit", verifyTokenAndAdmin, getMonthlyProfit)

// get orders count
router.get("/count/ordersCount", verifyTokenAndAdmin, getOrdersCount)

// get monthly orders count
router.get("/count/monthlyOrdersCount", verifyTokenAndAdmin, getMonthlyOrdersCount)

// get users count
router.get("/count/usersCount", verifyTokenAndAdmin, getUsersCount)

//get Top Sales Books
router.get("/sales/topSales", verifyTokenAndAdmin,getTopSalesBooks)


module.exports = router