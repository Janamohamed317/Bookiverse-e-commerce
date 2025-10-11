import { useState } from "react";
import { motion } from "framer-motion";
import BookCard from "../../components/BookCard/BookCard";
import { pages } from "../../assets/assets";
import useBooksPerPage from "../../hooks/books/useBooksPerPage";
import Spinner from "../../components/Spinner/Spinner";
import type { Book } from "../../types/Book";
import useGetAllBooks from "../../hooks/books/useGetAllBooks";
import Search from "../../components/Search/Search";
import { searchForBook } from "../../services/BooksServices";

const DisplayBooks = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchedBook, setSearchedBook] = useState("");
    let filteredData: Book[] | undefined;
    const { data, isLoading, error } = useBooksPerPage(pageNumber);
    const { data: allBooks } = useGetAllBooks();

    filteredData = searchForBook(searchedBook, allBooks!);
    searchedBook === "" ? (filteredData = data) : filteredData;

    if (isLoading) return <Spinner size={50} color="#f5f5dc" />;

    if (error) return <p className="text-center text-red-500">Failed to load books.</p>;

    return (
        <div className="h-auto flex flex-col justify-center items-center" id="books">
            <h2 className="text-center font-bold text-[#f5f5dc] text-4xl my-5">Our Books</h2>
            <Search sendDataToParent={setSearchedBook} />

            <motion.div className="mt-5 flex gap-3 justify-center flex-wrap">
                {filteredData?.map((book) => (
                    <motion.div
                        key={book._id}
                        className="flex justify-around gap-2 m-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <BookCard book={book} />
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex text-[#f5f5dc] gap-2 justify-center items-center h-30 mt-5">
                {pages.map((page) => (
                    <div
                        key={page.id}
                        className="border-2 py-2 px-3 cursor-pointer rounded-xl hover:bg-[#cfb58b]"
                        onClick={() => setPageNumber(page.page)}
                    >
                        {page.page}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayBooks;
