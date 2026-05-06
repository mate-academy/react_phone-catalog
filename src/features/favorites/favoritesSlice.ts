/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import type { RootState } from '../../app/store';

export interface FavoritesState {
  items: Product[];
}

const FAVORITES_KEY = 'favorites';

const loadFavorites = (): Product[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
};

const saveFavorites = (items: Product[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {}
};

const initialState: FavoritesState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const p = action.payload;
      const exists = state.items.find(i => i.itemId === p.itemId);

      if (exists) {
        state.items = state.items.filter(i => i.itemId !== p.itemId);
      } else {
        state.items.push(p);
      }

      saveFavorites(state.items);
    },
    clearFavorites: state => {
      state.items = [];
      saveFavorites([]);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavoritesItems = (state: RootState) => state.favorites.items;
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.items.length;

export default favoritesSlice.reducer;
