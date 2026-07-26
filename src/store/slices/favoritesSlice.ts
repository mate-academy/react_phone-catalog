/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

export type FavoriteItem = {
  itemId: string;
  category: string;
};

type FavoritesState = {
  items: FavoriteItem[];
};

const initialState: FavoritesState = {
  items: loadFromStorage<FavoriteItem[]>('favorites', []),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      // Перевіряємо, чи вже є такий продукт
      if (!state.items.find(item => item.itemId === action.payload.itemId)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      // Видаляємо по id
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
