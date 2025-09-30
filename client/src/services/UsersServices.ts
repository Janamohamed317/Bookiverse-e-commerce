import type { Signin, Signup, UpdatedUser, User } from "../types/User"
import { validateData } from "../utils/SignUpValidation"
import { apiRequest } from "./Axiox"



export const deleteUser = async (userId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest(`/api/users/remove/${userId}`, "DELETE", {}, token)

}

export const blockOrUnblockUser = async (user: User) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("You must login as Admin");
    }

    const url = user.blocked ? `/api/users/unblock/${user._id}` : `/api/users/block/${user._id}`;
    return await apiRequest<User>(url, "PUT", {}, token);
};

export const fetchUsers = async (blocked: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    const url = blocked === " " ? `$/api/users` : `/api/users?blocked=${blocked}`
    return await apiRequest<User[]>(url, "GET", {}, token)

};

export const getUserInfo = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    const userId = localStorage.getItem("userId")
    return await apiRequest<User>(`/api/users/${userId}`, "GET", {}, token)

}

export const updateUserInfo = async (updatedData: UpdatedUser) => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<UpdatedUser>(`/api/users/edit/${userId}`, "PUT", updatedData, token)
}

export const signin = async (formData: Signin) => {
    return await apiRequest<Signin>('/api/auth/login', "POST", formData)
}

export const signup = async (formData: Signup) => {
    console.log(formData);

    if (validateData(formData)) {
        return await apiRequest<Signup>('/api/auth/register', "POST", {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        })
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

export const searchForUser = (searchedUser: string, data?: User[]) => {
    if (!data) {
        return []
    }
    if (searchedUser.trim() === "") {
        return data
    }
    searchedUser.toLowerCase()
    return data.filter((user) => user.username.toLowerCase().includes(`${searchedUser}`))
}

