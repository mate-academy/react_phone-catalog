import { Product } from '@/features/products/types/product';
import { create } from 'zustand';

interface CardState {
  cart: Product[];
  favorites: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

export const useProductStore = create<CardState>(set => ({
  cart: [],
  favorites: [],
  // Додаємо товар, тільки якщо його ще немає в кошику
  addToCart: product =>
    set(state => {
      const isAlreadyInCart = state.cart.some(item => item.id === product.id);

      if (isAlreadyInCart) {
        return state;
      }

      return { cart: [...state.cart, product] };
    }),

  removeFromCart: id =>
    set(state => ({
      cart: state.cart.filter(item => item.id !== id),
    })),

  toggleFavorite: id =>
    set(state => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id],
    })),
}));
