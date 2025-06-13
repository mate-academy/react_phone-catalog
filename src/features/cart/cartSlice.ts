import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NormalizedProduct } from 'shared/helpers/normalizeProductType';

import { CartState } from './cart.types';

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<NormalizedProduct>) {
      const newItem = state.cartItems.find(
        item => item.product.id === action.payload.id,
      );

      if (!newItem) {
        state.cartItems.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.cartItems = state.cartItems.filter(
          item => item.product.id !== action.payload.id,
        );
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        item => item.product.id !== action.payload,
      );
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const curItem = state.cartItems.find(
        item => item.product.id === action.payload,
      );

      if (curItem) {
        curItem.quantity += 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const curItem = state.cartItems.find(
        item => item.product.id === action.payload,
      );

      if (!curItem) return;

      if (curItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          item => item.product.id !== action.payload,
        );
      } else {
        curItem.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
