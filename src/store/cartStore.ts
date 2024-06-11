import { create } from 'zustand';
import Product from '../types/Product';

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
      return {
        cartItems: state.cartItems.map(item => {
          const copyItem = item;

          if (copyItem.id === id) {
            copyItem.quantity =
              action === 'add' ? copyItem.quantity + 1 : copyItem.quantity - 1;

            return copyItem;
          }

          return copyItem;
        }),
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
