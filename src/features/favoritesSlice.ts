import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

import { client as localClient } from '../utils/localClient';
import { Product } from '../types/Product';

export const FAVORITES_STORAGE_KEY = 'favoritesStorage';

export type FavoritesState = {
  items: Product[];
};

const initialState: FavoritesState = {
  items: localClient.init(FAVORITES_STORAGE_KEY, [] as Product[]),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);

      localClient.write(FAVORITES_STORAGE_KEY, current(state).items);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.items = state.items// eslint-disable-line no-param-reassign
        .filter(item => item.itemId !== action.payload.itemId);

      localClient.write(FAVORITES_STORAGE_KEY, current(state).items);
    },
    clean: (state) => {
      state.items = [];// eslint-disable-line no-param-reassign

      localClient.write(FAVORITES_STORAGE_KEY, current(state).items);
    },
  },
});

export const {
  add, remove, clean,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
