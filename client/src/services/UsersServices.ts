import type { UpdatedUser, User } from "../types/User"
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

