import { createSlice } from '@reduxjs/toolkit';
import { CartProduct } from '../../types/types';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadFromLocalStorage<CartProduct>('cart'),
  reducers: {
    add: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);

      let updatedCart;

      if (index !== -1) {
        updatedCart = cart.map((product, i) =>
          i === index ? { ...product, amount: product.amount + 1 } : product,
        );
      } else {
        updatedCart = [...cart, { ...action.payload, amount: 1 }];
      }

      saveToLocalStorage('cart', updatedCart);

      return updatedCart;
    },

    decreaseAmount: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);
      let updatedCart = cart;

      if (index !== -1) {
        const product = cart[index];

        if (product.amount > 1) {
          updatedCart = cart.map((p, i) =>
            i === index ? { ...p, amount: p.amount - 1 } : p,
          );
        } else {
          updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
        }

        saveToLocalStorage('cart', updatedCart);
      }

      return updatedCart;
    },

    remove: (cart, action) => {
      const updatedCart = cart.filter(
        product => product.id !== action.payload.id,
      );

      saveToLocalStorage('cart', updatedCart);

      return updatedCart;
    },

    clearCart: () => {
      saveToLocalStorage('cart', []);

      return [];
    },
  },
});
