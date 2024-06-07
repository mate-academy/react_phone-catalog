import { create } from 'zustand';
import { getPhones } from '../api/getProduct';
import Product from '../types/Product';

type ProductStore = {
  cartItems: Product[];
  favorites: Product[];
  phones: Product[];
  isLoading: boolean;
  isError: boolean;
  fetchPhones: () => void;
  toggleProductInCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
};

export const useProductStore = create<ProductStore>(set => ({
  cartItems: [],
  favorites: [],
  phones: [],
  isLoading: false,
  isError: false,

  fetchPhones: async () => {
    set({ isLoading: true, isError: false });
    try {
      const phones = await getPhones();

      set({ phones, isLoading: false });
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },

  toggleProductInCart: (product: Product) =>
    set(state => {
      const isProductInCart = state.cartItems.some(
        item => item.id === product.id,
      );

      return {
        cartItems: isProductInCart
          ? state.cartItems.filter(item => item.id !== product.id)
          : [...state.cartItems, product],
      };
    }),

  toggleFavorite: (product: Product) =>
    set(state => {
      const isProductInFavorites = state.favorites.some(
        item => item.id === product.id,
      );

      return {
        favorites: isProductInFavorites
          ? state.favorites.filter(item => item.id !== product.id)
          : [...state.favorites, product],
      };
    }),
}));
