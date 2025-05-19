import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type User = {
  id: number;
  name: string;
  email: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  cart: CartItem[];

  login: (user: User) => void;
  logout: () => void;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;

  totalItems: () => number;
  totalPrice: () => number;
};

export const useAppStore = create<AppState>()(
persist(immer((set, get) => ({
  user: null,
  isAuthenticated: false,
  cart: [],

  login: (user) =>
    set((state) => {
      state.user = user;
      state.isAuthenticated = true;
    }),

  logout: () =>
    set((state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.cart = [];
    }),
  addToCart: (item) =>
    set((state) => {
      const existingOne = state.cart.find((i: any) => i.id == item.id);
      if (existingOne) {
        existingOne.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    }),
  removeFromCart: (id) => {
    set((state) => {
      state.cart = state.cart.filter((item: any) => item.id != id);
    });
  },

  clearCart: () =>
    set((state) => {
      state.cart = [];
    }),

  increaseQty: (id) =>
    set((state) => {
      const item = state.cart.find((item: any) => item.id === id);
      if (item) item.quantity += 1;
    }),

  decreaseQty: (id) =>
    set((state) => {
      const item = state.cart.find((item:any) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }),
  totalItems: () => {
    return get().cart.reduce((acc, item) => acc + item.quantity, 0);
  },
  totalPrice: () => {
    return get().cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
})),{
  name:'your-app-name_${appstateName}'
}
)
);
