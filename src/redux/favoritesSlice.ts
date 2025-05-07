import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteItem } from '../../src/constants/common';

const FAVORITES_KEY = 'favorites';

const loadFavoritesFromStorage = (): FavoriteItem[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);

  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: FavoriteItem[] = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const item = action.payload;
      const index = state.findIndex(fav => fav.id === item.id);

      if (index !== -1) {
        const updated = state.filter(fav => fav.id !== item.id);

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

        return updated;
      } else {
        const updated = [...state, item];

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

        return updated;
      }
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(action.payload));

      return action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
