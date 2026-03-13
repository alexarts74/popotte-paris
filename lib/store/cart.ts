import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, PackSize, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAddedAt: number;
  addItem: (product: Product, packSize: PackSize) => void;
  removeItem: (slug: string, packSize: PackSize) => void;
  updateQuantity: (slug: string, packSize: PackSize, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedAt: 0,

      addItem: (product, packSize) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.slug === product.slug && i.packSize === packSize
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.slug === product.slug && i.packSize === packSize
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, packSize, quantity: 1 }] };
        });
        set({ lastAddedAt: Date.now() });
      },

      removeItem: (slug, packSize) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.slug === slug && i.packSize === packSize)
          ),
        }));
      },

      updateQuantity: (slug, packSize, quantity) => {
        if (quantity <= 0) {
          get().removeItem(slug, packSize);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.slug === slug && i.packSize === packSize
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.prices[i.packSize] * i.quantity,
          0
        ),
    }),
    {
      name: "popote-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
