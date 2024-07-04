import Product from '../types/Product';
import { create } from 'zustand';

type UCartItem = {
  quantity: number;
  id: string;
  product: Product;
};

type CartStore = {
  cartItems: UCartItem[];
  toggleProductInCart: (product: UCartItem) => void;
  changeQuantityInCart: (id: string, action: 'add' | 'sub') => void;
  deleteProductInCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>(set => ({
  cartItems: JSON.parse(localStorage.getItem('cartitems') || '[]'),

  toggleProductInCart: (product: UCartItem) =>
    set(state => {
      const isProductInCart = state.cartItems.some(
        item => item.id === product.id,
      );

      const newCartItems = isProductInCart
        ? state.cartItems.filter(item => item.id !== product.id)
        : [...state.cartItems, product];

      localStorage.setItem('cartitems', JSON.stringify(newCartItems));

      return {
        cartItems: newCartItems,
      };
    }),

  changeQuantityInCart: (id: string, action: 'add' | 'sub') =>
    set(state => {
      const newCartItems = state.cartItems.map(item => {
        if (item.id === id) {
          const updatedQuantity =
            action === 'add' ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: updatedQuantity > 0 ? updatedQuantity : 0,
          };
        }

        return item;
      });

      localStorage.setItem('cartitems', JSON.stringify(newCartItems));

      return {
        cartItems: newCartItems,
      };
    }),

  deleteProductInCart: (id: string) =>
    set(state => {
      const newCartItems = state.cartItems.filter(
        cartItem => cartItem.id !== id,
      );

      localStorage.setItem('cartitems', JSON.stringify(newCartItems));

      return {
        cartItems: newCartItems,
      };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem('cartitems');

      return {
        cartItems: [],
      };
    }),
}));
