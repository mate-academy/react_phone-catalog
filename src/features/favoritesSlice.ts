import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* import { ProductDetails } from '../types/ProductDetails'; */
import { Product } from '../types/Product';

export interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.favorites.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (itemIndex < 0) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.favorites.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
