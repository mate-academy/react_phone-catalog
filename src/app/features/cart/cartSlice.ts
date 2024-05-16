/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';

type State = Record<ProductId, number>;

type PayloadId = PayloadAction<Pick<Product, 'id'>>;

const initialState: State = {};

export const cartSlice = createSlice({
  initialState,
  name: 'inCart',
  reducers: {
    increase(state, { payload: { id } }: PayloadId) {
      const count = state[id];

      if (typeof state[id] === 'number') {
        state[id] = Math.min(count + 1, 99);
      }
    },
    decrease(state, { payload: { id } }: PayloadId) {
      const count = state[id];

      if (typeof count === 'number') {
        state[id] = Math.max(count - 1, 1);
      }
    },
    addProduct(state, { payload: { id } }: PayloadId) {
      state[id] = 1;
    },
    deleteProduct(state, { payload: { id } }: PayloadId) {
      delete state[id];
    },
  },
});

export const { addProduct, deleteProduct, decrease, increase } =
  cartSlice.actions;
