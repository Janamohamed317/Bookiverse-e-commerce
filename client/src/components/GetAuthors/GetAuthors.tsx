import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Author } from "../../types/Author";
import useDeleteAuthor from "../../hooks/authors/useDeleteAuthor";
import Search from "../Search/Search";
import { searchForAuthor } from "../../services/AuthorsServices";
import Spinner from "../Spinner/Spinner";
import { useAuthorStore } from "../../store/AuthorStore";

const GetAuthors = () => {
    const deleteAuthor = useDeleteAuthor();
    const { authors, isLoadingAuthors, getAuthors } = useAuthorStore();

    useEffect(() => {
        getAuthors();
    }, []);
    const [searchedItem, setSearchedItem] = useState("");
    const FilteredData = searchForAuthor(searchedItem, authors);


    const navigate = useNavigate();

    if (isLoadingAuthors) {
        return <Spinner size={50} color="#f5f5dc" />;
    }

    const NavigateToEditAuthor = (author: Author) => {
        navigate("EditAuthor", {
            state: {
                author: author,
            },
        });
    };

    return (
        <div className="mt-6 flex flex-col gap-4">
            <Search sendDataToParent={setSearchedItem} />
            {FilteredData?.map((author) => (
                <div
                    key={author._id}
                    className="flex justify-between items-center p-4 rounded-xl bg-[#2B2118]/50 backdrop-blur-md border border-white/10 shadow-md"
                >
                    <span className="text-white font-medium">{author.fullName}</span>

                    <div className="flex gap-3">
                        <button
                            className="cursor-pointer bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] px-4 py-2 rounded-lg font-medium transition"
                            onClick={() => deleteAuthor.mutate(author._id)}
                        >
                            Delete
                        </button>

                        <button
                            className="cursor-pointer bg-[#3A5A78] hover:bg-[#4F7191] text-white px-4 py-2 rounded-lg font-semibold transition"
                            onClick={() => NavigateToEditAuthor(author)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GetAuthors;
