import type { Author, NewAuthor } from "../types/Author"
import { apiRequest } from "./Axiox"

export const addNewAuthor = async (authorData: NewAuthor) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest("/api/authors/add", "POST", authorData, token)
}

export const removeAuthor = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest(`/api/authors/delete/${id}`, "DELETE", {}, token)
}

export const updateAuthor = async (authorData: NewAuthor, author: Author) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest(`/api/authors/edit/${author._id}`, "PUT", authorData, token)
}

export const searchForAuthor = (searchedAuthor: string, data: Author[]) => {
    if (searchedAuthor.trim() === "") {
        return data
    }
    searchedAuthor.toLowerCase()
    return data.filter((author) => author.fullName.toLowerCase().includes(`${searchedAuthor}`))
}


