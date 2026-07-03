/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface FavoritesState {
  items: Product[];
}

const loadFavoritesFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.id === product.id,
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
