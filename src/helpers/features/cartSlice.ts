/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.cart.push({
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      });
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.cart = state.cart
        .filter(cartItem => cartItem.id !== action.payload);
    },
    decreaseAmount: (state: CartState, action: PayloadAction<string>) => {
      const index = state.cart
        .findIndex(cartItem => cartItem.id === action.payload);

      state.cart[index].quantity -= 1;
    },
    increaseAmount: (state: CartState, action: PayloadAction<string>) => {
      const index = state.cart
        .findIndex(cartItem => cartItem.id === action.payload);

      state.cart[index].quantity += 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseAmount,
  increaseAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
