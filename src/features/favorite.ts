/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface FavoriteState {
  items: Product[];
}

const loadFavoritesFromLocalStorage = (): Product[] => {
  const storedFavorites = localStorage.getItem('favorites');

  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: FavoriteState = {
  items: loadFavoritesFromLocalStorage(),
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.items = [...state.items, ...action.payload];

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    deleteFavorites(state, action) {
      state.items = state.items.filter(
        item => item.itemId !== action.payload && item.id !== action.payload,
      );

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { setFavorites, deleteFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
