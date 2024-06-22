/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';

type State = Record<ProductId, number>;

type PayloadId = PayloadAction<Pick<Product, 'itemId'>>;

const initialState: State = {};

export const cartSlice = createSlice({
  initialState,
  name: 'inCart',
  reducers: {
    increase(state, { payload: { itemId } }: PayloadId) {
      const count = state[itemId];

      if (typeof state[itemId] === 'number') {
        state[itemId] = Math.min(count + 1, 99);
      }
    },
    decrease(state, { payload: { itemId } }: PayloadId) {
      const count = state[itemId];

      if (typeof count === 'number') {
        state[itemId] = Math.max(count - 1, 1);
      }
    },
    addProduct(state, { payload: { itemId } }: PayloadId) {
      state[itemId] = 1;
    },
    deleteProduct(state, { payload: { itemId } }: PayloadId) {
      delete state[itemId];
    },
  },
});

export const { addProduct, deleteProduct, decrease, increase } =
  cartSlice.actions;
