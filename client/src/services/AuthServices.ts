import type { Signin, Signup } from "../types/User";
import { validateData } from "../utils/SignUpValidation";
import { apiRequest } from "./Axiox";

export const signin = async (formData: Signin) => {
    return await apiRequest<Signin>('/api/auth/login', "POST", formData)
}

export const signup = async (formData: Signup) => {
    if (validateData(formData)) {
        const res = await apiRequest<Signup>('/api/auth/register', "POST", {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        })
        await sendOTP(formData.email)
        return res
    }
}

export const resetPassword = async (id: string, password: string, token: string) => {
    return await apiRequest(`/api/password/reset-password/${id}/${token}`, "POST", { password })
}

export const verifyLink = async (id: string, setInvalid: any, token: string) => {
    try {
        return await apiRequest(`/api/password/reset-password/${id}/${token}`, "GET")
    } catch {
        setInvalid(true)
        console.log(token);

    }
}

export const forgetPassword = async (email: string) => {
    return await apiRequest("/api/password/forgot-password", "POST", { email })
}

export const sendOTP = async (email: string) => {
    return await apiRequest("/api/otp/sendOTP", "POST", { email })
}

export const verifyOTP = async (otp: string, email: string) => {
    return await apiRequest("/api/otp/verifyOTP", "POST", { otp, email })
}