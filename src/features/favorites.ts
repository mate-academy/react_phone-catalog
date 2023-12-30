/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../types/Phone';

const savedFavorites = localStorage.getItem('favorites');

type InitialState = {
  favorites: Phone[],
  loading: boolean,
  error: boolean,
};

const initialState: InitialState = {
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
  loading: false,
  error: false,
};

const saveToLocalStorage = (state: InitialState) => {
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Phone>) => {
      state.favorites.push(action.payload);
      saveToLocalStorage(state);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => (
        item.id !== action.payload));
      saveToLocalStorage(state);
    },
  },
});

export default favoritesSlice.reducer;
export const { add, remove } = favoritesSlice.actions;
