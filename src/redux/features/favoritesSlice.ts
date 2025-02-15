import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getFavoritesFromLS } from '../../utils/getFavoritesFromLS';

export interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: getFavoritesFromLS(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const newProd = { ...action.payload, isFavorite: true };

      state.favorites.push(newProd);

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    removeToFavorites: (state, action: PayloadAction<string>) => {
      const index = state.favorites.findIndex(
        item => item.itemId === action.payload,
      );

      if (index !== -1) {
        state.favorites.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, removeToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
