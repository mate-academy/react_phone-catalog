/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';
import { favouriteLocalStorageManager } from './localStorageManager';

export type State = {
  items: ProductId[];
};

type PayloadId = PayloadAction<Pick<Product, 'itemId'>>;

const initialState: State = favouriteLocalStorageManager.get() || { items: [] };

export const favouritesSlice = createSlice({
  initialState,
  name: 'favourites',
  reducers: {
    addItem(state, { payload: { itemId } }: PayloadId) {
      state.items.push(itemId);
    },
    removeItem(state, { payload: { itemId } }: PayloadId) {
      const target = state.items.findIndex(currentId => currentId === itemId);

      state.items.splice(target, 1);
    },
    toggleItem(state, { payload: { itemId } }: PayloadId) {
      if (!state.items.includes(itemId)) {
        state.items.push(itemId);
      } else {
        const target = state.items.findIndex(currentId => currentId === itemId);

        state.items.splice(target, 1);
      }
    },
  },
});

export const { addItem, removeItem, toggleItem } = favouritesSlice.actions;
