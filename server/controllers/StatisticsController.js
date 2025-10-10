const { Order } = require("../models/Order");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { Book } = require("../models/Book");


const monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getTotalProfit = asyncHandler(async (req, res) => {
    const ordersProfit = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$subTotal" }
            }
        }
    ]);

    return res.status(200).json(ordersProfit[0].total);
});


const getMonthlyProfit = asyncHandler(async (req, res) => {
    const monthlyProfits = await Order.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                totalProfit: { $sum: "$subTotal" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]);

    const formatted = monthlyProfits.map(item => ({
        year: item._id.year,
        month: monthNames[item._id.month],
        totalProfit: item.totalProfit
    }));

    return res.status(200).json(formatted)
})

const getOrdersCount = asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
        { $count: "totalOrders" }
    ]);

    return res.status(200).json(orders[0].totalOrders);
});


const getMonthlyOrdersCount = asyncHandler(async (req, res) => {
    const ordersPerMonth = await Order.aggregate([
        {
            $group:
            {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                totalOrders: { $sum: 1 }
            },
        }
    ])
    const formatted = ordersPerMonth.map(item => ({
        year: item._id.year,
        month: monthNames[item._id.month],
        totalOrders: item.totalOrders
    }));

    return res.status(200).json(formatted)


})

const getUsersCount = asyncHandler(async (req, res) => {
    const users = await User.find()
    return res.status(200).json(users.length)
})

const getTopSalesBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().sort({ soldCount: -1 }).limit(5).select("title soldCount -_id")
    return res.status(200).json(books)
})

module.exports = {
    getTopSalesBooks,
    getUsersCount,
    getTotalProfit,
    getMonthlyOrdersCount,
    getOrdersCount,
    getMonthlyProfit,
}