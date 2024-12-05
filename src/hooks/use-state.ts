// add items
// remove items
// clear
// (keep track of items)

import { Product, User } from "@/project-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"
export type Item = {
    product: Product
}
export type Users = {
    user: User
}
export type OrderItem = {
    products: Product[]; // Array of products in the same order
    purchasedAt: string; // Timestamp of purchase
    tracking_number: string; // Tracking number
    amount: number; // Total amount for the order
};

type OrdersState = {
    orders: OrderItem[];
    addOrder: (order: OrderItem) => void;
    addMultipleOrders: (orders: OrderItem[]) => void;
    clearOrders: () => void;
};
// export type OrderItem = {
//     product: Product;
//     purchasedAt: string; // Timestamp of purchase
//     tracking_number: string;
//     amount: number;
//   };
  
//   type OrdersState = {
//     orders: OrderItem[];
//     addOrder: (order: OrderItem) => void;
//     addMultipleOrders: (orders: OrderItem[]) => void;
//     clearOrders: () => void;
//   };
type UserChange = {
    items: Users[]
    removeItem: (userId: string) => void
    addItem: (user: User) => void
    clear: () => void
}
type StateChange = {
    items: Item[]
    removeItem: (productId: string) => void
    addItem: (product: Product) => void
    clear: () => void
}
export const useOrdersChange = create<OrdersState>()(
    persist(
      (set) => ({
        orders: [],
        addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
        addMultipleOrders: (orders) =>
          set((state) => ({ orders: [...state.orders, ...orders] })),
        clearOrders: () => set({ orders: [] }),
      }),
      {
        name: "orders-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
);

export const useStateChange = create<StateChange>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => {
                return { items: [...state.items, { product }] }
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.product._id !== id)
            })),
            clear: () => set({ items: [] })
        }), {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
const expirationTimeInMs = 60 * 60 * 1000; // e.g., 1 hour

export const userStateChange = create<UserChange>()(
  persist(
    (set) => ({
      items: [],
      addItem: (user) => set((state) => {
        // const expiration = Date.now() + expirationTimeInMs;
        // localStorage.setItem('user-expiration', expiration.toString());
        // localStorage.setItem("user-expiration", expiration.toString());
        return { items: [...state.items, { user }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.user._id !== id)
      })),
      clear: () => set({ items: [] }),
    }), {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

  

export const useLikedChange = create<StateChange>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => {
                return { items: [...state.items, { product }] }
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.product._id !== id)
            })),
            clear: () => set({ items: [] })
        }), {
            name: "liked-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// const checkExpiration = () => {
//     const expiration = localStorage.getItem("user-expiration");
//     if (expiration && Date.now() > parseInt(expiration)) {
//       localStorage.removeItem("user-storage");
//       localStorage.removeItem("user-expiration");
//     }
//   };
  
//   // Call `checkExpiration` on app initialization
//   checkExpiration();