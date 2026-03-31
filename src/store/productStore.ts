import { Product } from '@/features/products/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CardState {
  cart: CartItem[];
  favorites: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: number) => void;
  currentProductName: string | undefined;
  setCurrentProductName: (name: string | undefined) => void;
}

export const useProductStore = create<CardState>()(
  persist(
    set => ({
      cart: [],
      favorites: [],

      addToCart: product =>
        set(state => {
          const exists = state.cart.some(
            item => item.product.id === product.id,
          );

          if (exists) {
            return state;
          }

          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),

      removeFromCart: id =>
        set(state => ({
          cart: state.cart.filter(item => item.product.id !== id),
        })),

      increaseQuantity: id =>
        set(state => ({
          cart: state.cart.map(item =>
            item.product.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: id =>
        set(state => ({
          cart: state.cart.map(item =>
            item.product.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleFavorite: id =>
        set(state => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(favId => favId !== id)
            : [...state.favorites, id],
        })),

      currentProductName: undefined as string | undefined,
      setCurrentProductName: name => set({ currentProductName: name }),
    }),
    { name: 'product-store' },
  ),
);
