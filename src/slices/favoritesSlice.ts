import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteProduct } from '../types/favoriteProduct';

type StateProps = {
  items: FavoriteProduct[];
  loading: boolean;
};

const initialState: StateProps = {
  items: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addItemToFavorites: (
      state,
      action: PayloadAction<{ item: FavoriteProduct }>,
    ) => {
      const { item } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (!existingItem) {
        state.items.push(item);
      }
    },

    removeItemFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    loadFavoritesFromStorage: state => {
      state.loading = true;
      try {
        const storedItems = JSON.parse(
          localStorage.getItem('favorites') || '[]',
        );

        if (Array.isArray(storedItems)) {
          state.items = storedItems;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load favorites from localStorage:', error);
        state.items = [];
      }

      state.loading = false;
    },
  },
});

export const {
  addItemToFavorites,
  removeItemFromFavorites,
  loadFavoritesFromStorage,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
