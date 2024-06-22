/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';

type State = ProductId[];

type PayloadId = PayloadAction<Pick<Product, 'itemId'>>;

const initialState: State = [];

export const favouritesSlice = createSlice({
  initialState,
  name: 'favourites',
  reducers: {
    addItem(state, { payload: { itemId } }: PayloadId) {
      state.push(itemId);
    },
    removeItem(state, { payload: { itemId } }: PayloadId) {
      const target = state.findIndex(currentId => currentId === itemId);

      state.splice(target, 1);
    },
    toggleItem(state, { payload: { itemId } }: PayloadId) {
      if (!state.includes(itemId)) {
        state.push(itemId);
      } else {
        const target = state.findIndex(currentId => currentId === itemId);

        state.splice(target, 1);
      }
    },
  },
});

export const { addItem, removeItem, toggleItem } = favouritesSlice.actions;
