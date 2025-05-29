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

    removeFromCart(state, action) {
      state.cartItems.filter(item => action.payload !== item.product.id);
    },

    // increaseQuantity(state, action) {},

    // decreaseQuantity(state, action) {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
