import type { Book, NewBook } from "../types/Book";
import { UploadImg } from "../utils/UploadImg";
import { apiRequest } from "./Axiox";

export const getAllBooks = async () => {
    return await apiRequest<Book[]>("/api/books", "GET")
}

export const deleteBook = async (bookId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<Book>(`/api/books/delete/${bookId}`, "DELETE", {}, token)
}

export const updateBook = async (bookData: NewBook, file: File | null, book: Book) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    await apiRequest<NewBook>(`/api/books/edit/${book._id}`, "PUT", bookData, token)
    if (file) {
        await UploadImg(book, file);
    }
}

export const addNewBook = async (bookData: NewBook, file: File | null) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("You must login as Admin");
    }
    const newBook = await apiRequest<Book>("/api/books/add", "POST", bookData, token);
    if (file) {
        await UploadImg(newBook, file);
    }
}

export const getBooksPerPage = async (pageNumber: number) => {
    return await apiRequest<Book>(`/api/books?pageNumber=${pageNumber}`, "GET")
}

export const searchForBook = (searchedBook: string, data: Book[]) => {
    if (!searchedBook.trim()) {
        return data;
    }
    return data.filter((book) =>
        book.title.toLowerCase().includes(searchedBook.toLowerCase())
    );
};
