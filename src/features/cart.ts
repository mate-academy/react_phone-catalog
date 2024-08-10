// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as Product[],
  reducers: {
    addToCart: (cart, action) => [...cart, action.payload],
    removeFromCart: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);

      if (index !== -1) {
        return [...cart.slice(0, index), ...cart.slice(index + 1)];
      }

      return cart;
    },
    deleteFromCart: (cart, action) => {
      return cart.filter(product => product.id !== action.payload.id);
    },
  },
});
