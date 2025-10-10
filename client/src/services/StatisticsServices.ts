import type { MonthlyOrdersCount, MonthlyProfit, TopSales } from "../types/Statistics";
import { apiRequest } from "./Axiox"

export const getMonthlyProfit = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<MonthlyProfit[]>("api/statistics/profit/monthlyProfit", "GET", {}, token)
}


export const getTotalProfit = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }

    return await apiRequest<number>("api/statistics/profit/totalProfit", "GET", {}, token)
}


export const getOrdersCount = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<number>("/api/statistics/count/ordersCount", "GET", {}, token)
}

export const getMonthlyOrdersCount = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<MonthlyOrdersCount[]>("/api/statistics/count/monthlyOrdersCount", "GET", {}, token)
}


export const getTopSalesBook = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<TopSales[]>("/api/statistics/sales/topSales", "GET", {}, token)
}


export const getUsersCount = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<number>("/api/statistics/count/usersCount", "GET", {}, token)
}   