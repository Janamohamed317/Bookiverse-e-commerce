import { create } from 'zustand'
import type { NewBook } from '../types/Book';

type BookState = {
    bookData: NewBook;
    setBookData: (data: NewBook) => void;
};

export const useBookStore = create<BookState>((set) => ({
    bookData: {
        title: "",
        author: "",
        description: "",
        cover: "",
        price: 0,
        quantity: 0,
    },
    setBookData: (data) => set((state) => ({
        bookData: { ...state.bookData, ...data },
    })),
}))