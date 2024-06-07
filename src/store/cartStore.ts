import { create } from 'zustand';
import Product from '../types/Product';

type CartStore = {
  cartItems: Product[];
  toggleProductInCart: (product: Product) => void;
};

export const useCartStore = create<CartStore>(set => ({
  cartItems: [],

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
}));
