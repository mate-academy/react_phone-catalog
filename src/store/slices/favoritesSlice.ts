import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FAVORITES_KEY } from '../../constants/localstorage-keys';
import { Product } from '../../types/Product';
import { getLocalStorage } from '../../utils';

export interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: getLocalStorage(FAVORITES_KEY),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const productIndex = state.favorites.findIndex(
        item => item.id === action.payload,
      );

      state.favorites.splice(productIndex, 1);

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, removeProduct } = favoritesSlice.actions;

export default favoritesSlice;
