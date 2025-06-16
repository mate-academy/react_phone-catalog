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
      state.cartItems.push({
        product: action.payload,
        quantity: 1,
      });
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.cartItems.findIndex(
        item => item.product.id === action.payload,
      );

      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
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

      if (curItem) {
        curItem.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
