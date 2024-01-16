import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

import { getClient } from '../utils/localClient';
import { Product } from '../types/Product';

const localClient = getClient('favoritesStorage');

export type FavoritesState = {
  items: Product[];
};

const initialState: FavoritesState = {
  items: localClient.init([] as Product[]),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);

      localClient.write(current(state).items);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.items = state.items// eslint-disable-line no-param-reassign
        .filter(item => item.itemId !== action.payload.itemId);

      localClient.write(current(state).items);
    },
    clean: (state) => {
      state.items = [];// eslint-disable-line no-param-reassign

      localClient.write(current(state).items);
    },
  },
});

export const {
  add, remove, clean,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
