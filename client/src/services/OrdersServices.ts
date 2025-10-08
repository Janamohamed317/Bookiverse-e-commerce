import type { CheckOut, Order, OrderedBooks } from "../types/Order"
import { apiRequest } from "./Axiox"


export const deleteOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<Order>(`/api/order/remove/${orderId}`, "DELETE", {}, token)
}

export const cancelOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<Order>(`/api/order/cancel/${orderId}`, "DELETE", {}, token)
}

export const getUserPastOrders = async () => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<Order[]>(`/api/order/user/${userId}`, "GET", {}, token)
}

export const getAllOrders = async (orderStatus: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    const url = orderStatus === " " ? `/api/order` : `/api/order?orderStatus=${orderStatus}`
    return await apiRequest<Order[]>(url, "GET", {}, token)
}

export const getOrderInfo = async (orderId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<Order>(`/api/order/${orderId}`, "GET", {}, token)
}

export const newOrder = async (orderBooks: OrderedBooks[], shippingInfo: CheckOut, code?: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }

    return await apiRequest<Order>("/api/order/newOrder", "POST",
        {
            books: orderBooks,
            address: shippingInfo.address,
            phone: shippingInfo.phone,
            notes: shippingInfo.notes,
            userId: localStorage.getItem("userId"),
            code: code
        },
        token)
}

export const confirmOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<Order>(`/api/order/confirmOrder/${orderId}`, "PUT", {}, token)
}

export const calculateTotalPrice = (cartItems: OrderedBooks[]) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 30)
}

export const searchForOrder = (searchedOrder: string, data?: Order[]) => {
    if (!data) {
        return []
    }
    if (searchedOrder.trim() === "") {
        return data
    }
    return data.filter((user) => user.orderNumber.toLowerCase().includes(`${searchedOrder}`))
}
