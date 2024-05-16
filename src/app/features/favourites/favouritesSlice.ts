/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductId } from '../../../types';

type State = ProductId[];

type PayloadId = PayloadAction<Pick<Product, 'id'>>;

const initialState: State = [];

export const favouritesSlice = createSlice({
  initialState,
  name: 'favourites',
  reducers: {
    addItem(state, { payload: { id } }: PayloadId) {
      state.push(id);
    },
    removeItem(state, { payload: { id } }: PayloadId) {
      const target = state.findIndex(currentId => currentId === id);

      state.splice(target, 1);
    },
    toggleItem(state, { payload: { id } }: PayloadId) {
      if (!state.includes(id)) {
        state.push(id);
      } else {
        const target = state.findIndex(currentId => currentId === id);

        state.splice(target, 1);
      }
    },
  },
});

export const { addItem, removeItem, toggleItem } = favouritesSlice.actions;
