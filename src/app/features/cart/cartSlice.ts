/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';
import { cartLocalStorageManager } from './localStorageManager';

export type State = {
  cart: Record<ProductId, number>;
};

type PayloadId = PayloadAction<Pick<Product, 'itemId'>>;

const initialState: State = cartLocalStorageManager.get() || { cart: {} };

export const cartSlice = createSlice({
  initialState,
  name: 'inCart',
  reducers: {
    increase(state, { payload: { itemId } }: PayloadId) {
      const count = state.cart[itemId];

      if (typeof state.cart[itemId] === 'number') {
        state.cart[itemId] = Math.min(count + 1, 99);
      }
    },
    decrease(state, { payload: { itemId } }: PayloadId) {
      const count = state.cart[itemId];

      if (typeof count === 'number') {
        state.cart[itemId] = Math.max(count - 1, 1);
      }
    },
    addProduct(state, { payload: { itemId } }: PayloadId) {
      state.cart[itemId] = 1;
    },
    deleteProduct(state, { payload: { itemId } }: PayloadId) {
      delete state.cart[itemId];
    },
    clearCart(state) {
      state.cart = {};
    },
  },
});

export const { addProduct, deleteProduct, decrease, increase, clearCart } =
  cartSlice.actions;
