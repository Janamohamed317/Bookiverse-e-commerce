import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { OrderedBooks } from "../types/Order"

type CartType = {
    cartItems: OrderedBooks[]
    setCartItems: (items: OrderedBooks[]) => void
    incrementCartItem: (book: OrderedBooks) => void
    decrementCartItem: (book: OrderedBooks) => void
    removeCartItem: (book: OrderedBooks) => void
    getItemQuantity: (book: OrderedBooks) => number
    clearCart: () => void
}

export const useCartStore = create<CartType>()(
    persist(
        (set, get) => ({
            cartItems: [],
            setCartItems: (items) => set(() => ({ cartItems: items })),

            incrementCartItem: (book) => {
                set((state) => {
                    const item = state.cartItems.find((i) => i.book === book.book)
                    if (item) {
                        return {
                            cartItems: state.cartItems.map((i) =>
                                i.book === book.book
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        }
                    } else {
                        return {
                            cartItems: [...state.cartItems, { ...book, quantity: 1 }],
                        }
                    }
                })
            },

            removeCartItem: (book) => {
                set((state) => ({
                    cartItems: state.cartItems.filter((i) => i.book !== book.book),
                }))
            },

            decrementCartItem: (book) => {
                set((state) => {
                    const item = state.cartItems.find((i) => i.book === book.book)
                    if (!item) return state

                    if (item.quantity > 1) {
                        return {
                            cartItems: state.cartItems.map((i) =>
                                i.book === book.book ? { ...i, quantity: i.quantity - 1 } : i
                            ),
                        }
                    } else {
                        return {
                            cartItems: state.cartItems.filter((i) => i.book !== book.book),
                        }
                    }
                })
            },

            getItemQuantity: (book) => {
                const item = get().cartItems.find((i) => i.book === book.book)
                return item ? item.quantity : 0
            },

            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'cartItems', 
            storage: createJSONStorage(() => localStorage),
        }
    )
)
