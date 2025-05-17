import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};


  
export const userCartStore = create<CartStore>()(
    persist(
      immer((set) => ({
        cart: [],
        addItem: (item) =>
          set((state) => {
            state.cart.push(item);
          }),
        removeItem: (id) =>
          set((state) => {
            state.cart = state.cart.filter((item: { id: number; }) => item.id !== id);
          }),
        clearCart: () =>
          set((state) => {
            state.cart = [];
          }),
        increaseQty: (id) =>
          set((state) => {
            const item = state.cart.find((item: { id: number; }) => item.id === id);
            if (item) item.quantity += 1;
          }),
        decreaseQty: (id) =>
          set((state) => {
            const item = state.cart.find((item: { id: number; }) => item.id === id);
            if (item && item.quantity > 1) item.quantity -= 1;
          }),
      })),
      {
        name: "local-storage", 
      }
    )
  );
  