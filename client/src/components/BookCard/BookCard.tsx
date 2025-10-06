import axios from "axios";
import type { Book } from "../../types/Book";
import { useQuery } from "@tanstack/react-query";
import type { Author } from "../../types/Author";
import type { OrderedBooks } from "../../types/Order";
import { useCartStore } from "../../store/cartStore";

type BookInfoProps = {
    book: Book;
};

const BookCard = ({ book }: BookInfoProps) => {
    const authorId = book.author._id;


    const { incrementCartItem, decrementCartItem, getItemQuantity } = useCartStore();

    const { data } = useQuery<Author>({
        queryKey: ["authorName", authorId],
        queryFn: async () => {
            const res = await axios.get(
                `https://book-store-seven-tan.vercel.app/api/authors/${authorId}`
            );
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    const bookToOrder: OrderedBooks = {
        book: book._id,
        title: book.title,
        image: book.image,
        price: book.price,
        quantity: 1
    };

    const quantityInCart = getItemQuantity(bookToOrder);
    return (
        <div className="w-90 bg-white/5 backdrop-blur text-white rounded-lg">
            <img src={book.image} className="rounded-t-lg w-full h-100" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                    {book.title}
                </h5>
                <p className=" font-semibold">Description</p>
                <p className="mb-2 font-normal ">{book.description}</p>
                <div className="flex justify-between items-center">
                    <p className="mb-1 font-medium italic">
                        by {data?.fullName}
                    </p>
                    <p className="mb-1 font-bold ">{book.price} $</p>
                </div>
                <p>Available: {book.quantity}</p>
                {
                    quantityInCart === 0 ?
                        <button
                            onClick={() => incrementCartItem(bookToOrder)}
                            className="bg-[#D7A86E] hover:bg-[#7b6443] p-2 rounded-2xl mt-2 cursor-pointer text-[#2B2118]">
                            Add To Cart</button>
                        :
                        <div className="flex gap-2 mt-2">
                            <button
                                className="px-3 py-1 bg-[#D7A86E] hover:bg-[#7b6443]  text-[#2B2118] rounded cursor-pointer"
                                onClick={() => incrementCartItem(bookToOrder)}
                                disabled={quantityInCart >= book.quantity}
                            >
                                +
                            </button>
                            <p>{quantityInCart}</p>

                            <button
                                className="px-3 py-1 bg-[#D7A86E] hover:bg-[#7b6443]  text-[#2B2118] rounded cursor-pointer"
                                onClick={() => decrementCartItem(bookToOrder)}
                            >
                                -
                            </button>
                        </div>
                }
            </div>
        </div>
    );
}

export default BookCard;
