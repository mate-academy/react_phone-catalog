import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromLocalStorage } from './localStorage';

const FAVORITES_STORAGE_KEY = 'favorites';

type FavoritesState = {
  itemIds: string[];
};

const initialState: FavoritesState = {
  itemIds: loadFromLocalStorage<string[]>(FAVORITES_STORAGE_KEY, []),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const isFavorite = state.itemIds.includes(itemId);

      if (isFavorite) {
        return {
          itemIds: state.itemIds.filter(id => id !== itemId),
        };
      }

      return {
        itemIds: [...state.itemIds, itemId],
      };
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      return {
        itemIds: state.itemIds.filter(id => id !== itemId),
      };
    },

    clearFavorites: () => {
      return {
        itemIds: [],
      };
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
