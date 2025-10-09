import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBook } from '../../services/BooksServices';
import type { Book, NewBook } from '../../types/Book';
import { resetBookData } from '../../utils/ResetBookData';
import Swal from 'sweetalert2';
import axios from 'axios';
import type { Error } from '../../types/Error';
import { useNavigate } from 'react-router';

const useEditBook = (bookData: NewBook, file: File | null, book: Book, setBookData: any) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => updateBook(bookData, file, book),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["booksPerPage"] });
            resetBookData(setBookData);
            Swal.fire({
                icon: "success",
                text: "Book is successfully updated",
                confirmButtonText: "OK",
            });

            navigate("/admin");
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There is an error",
                    text: error.response?.data?.message || "An unknown error occurred",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useEditBook