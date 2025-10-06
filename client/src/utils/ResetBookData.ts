import type { NewBook } from "../types/Book";

export function resetBookData(setBookData: (data: NewBook) => void) {
  setBookData({
    title: "",
    author: "",
    description: "",
    cover: "",
    price: 0,
    quantity: 0
  });
}
