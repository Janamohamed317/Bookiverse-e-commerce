import { create } from 'zustand'
import type { Author, NewAuthor } from '../types/Author'
import axios from 'axios';
import { useBookStore } from './BookStore';


type AuthorState = {
    authors: Author[],
    authorData: NewAuthor,
    setAuthorData: (data: NewAuthor) => void,
    AssignAuthorIdToAddedBook: (firstName: string) => void;
    getAuthors: () => void;
    isLoadingAuthors: boolean;
}

export const useAuthorStore = create<AuthorState>((set) => ({
    authors: [],
    authorData: {
        fullName: "",
        nationality: "",
    },
    isLoadingAuthors: false,

    setAuthorData: (data) => set((state) => ({
        authorData: { ...state.authorData, ...data }
    })),

    getAuthors: async () => {
        set({ isLoadingAuthors: true });
        try {
            const res = await axios.get("https://bookiverse-e-commerce.vercel.app/api/authors");
            set({ authors: res.data });
        } catch (err) {
            console.error("Error fetching authors:", err);
        } finally {
            set({ isLoadingAuthors: false });
        }
    },
    
    AssignAuthorIdToAddedBook: async (firstName: string) => {
        try {
            const res = await axios.get(
                `https://bookiverse-e-commerce.vercel.app/api/authors/name/${firstName}`
            );
            
            const { setBookData, bookData } = useBookStore.getState();
            setBookData({ ...bookData, author: res.data._id });
        } catch (err) {
            console.error("Error assigning author ID:", err);
        }
    },
}))