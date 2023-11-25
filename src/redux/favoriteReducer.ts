/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Iphone } from '../types/Iphone';
import { Product } from '../types/FavoritesItem';

const loadFromLocalStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);

  return localStorageData ? JSON.parse(localStorageData) : [];
};

export const saveToLocalStotage = (
  data: Iphone[] | Product[], LOCAL_STORAGE_KEY: string,
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const LOCAL_STORAGE_KEY = 'favourites';

type FavouritesState = {
  list: Product[];
  count: number;
};

const initialState: FavouritesState = {
  list: loadFromLocalStorage(LOCAL_STORAGE_KEY),
  count: 0,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (action.payload && action.payload.id) {
        state.list.push(action.payload);
        state.count += 1;
        saveToLocalStotage(state.list, LOCAL_STORAGE_KEY);
      }
    },

    removeFavorite: (state, action) => {
      if (action.payload && action.payload.id) {
        state.list = state.list.filter(
          (product) => product.id !== action.payload.id,
        );
        state.count -= 1;
        saveToLocalStotage(state.list, LOCAL_STORAGE_KEY);
      }
    },

    initializeFavorites: (state, action) => {
      state.list = action.payload;
      state.count = action.payload.length;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  initializeFavorites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
