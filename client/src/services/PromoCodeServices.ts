import type { CheckedPromoCode, NewPromoCode, PromoCode } from "../types/PromoCode"
import { apiRequest } from "./Axiox"




export const checkPromoCode = async (code: string) => {
    const userId = localStorage.getItem("userId")

    const res = await apiRequest<CheckedPromoCode>("/api/promo-code/check", "POST", { code, userId })
    return res
}

export const addPromoCode = async (promoCode: NewPromoCode) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    const payload = { ...promoCode };
    if (!payload.code) delete payload.code;
    return await apiRequest("/api/promo-code/new", "POST", payload, token)
}

export const getAllCodes = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    return await apiRequest<PromoCode[]>("/api/promo-code/codes", "GET", {}, token)
}

export const deleteCode = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }

    return await apiRequest(`/api/promo-code/delete/${id}`, "DELETE", {}, token)
}

export const sendWelcomeEmail = async (email: string) => {
    return await apiRequest("/api/promo-code/sendEmail", "POST", { email })
}