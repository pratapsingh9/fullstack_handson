import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  
  type CartState = {
    cart: CartItem[];
    promoCode: string | null;
    discountPercent: number;
  
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    applyPromo: (code: string) => void;
  
    totalPrice: () => number;
    discountedPrice: () => number;
  };
  
  export const useAdvancedCart = create<CartState>()(
    persist(
      immer((set, get) => ({
        cart: [],
        promoCode: null,
        discountPercent: 0,
  
        addItem: (item) =>
          set((state) => {
            const existing = state.cart.find((i:any) => i.id === item.id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              state.cart.push(item);
            }
          }),
  
        removeItem: (id) =>
          set((state) => {
            state.cart = state.cart.filter((item:any) => item.id !== id);
          }),
  
        applyPromo: (code) =>
          set((state) => {
            const validCodes: Record<string, number> = {
              SAVE10: 10,
              BIGSALE: 20,
            };
            if (validCodes[code]) {
              state.promoCode = code;
              state.discountPercent = validCodes[code];
            }
          }),
  
        totalPrice: () =>
          get().cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
  
        discountedPrice: () => {
          const total = get().totalPrice();
          return total - (total * get().discountPercent) / 100;
        },
      })),
      { name: "advanced-cart-store" }
    )
  );
  