/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const favoriteProducts
  = JSON.parse(localStorage.getItem('favorites') || '[]');

type FavoritesState = {
  favorites: Product[];
};

const initialState: FavoritesState = {
  favorites: favoriteProducts,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Product>) => {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...state.favorites, action.payload]),
      );
      state.favorites.push(action.payload);
    },
    removeFavoriteProduct: (state, action: PayloadAction<Product>) => {
      const filteredList
        = state.favorites.filter(product => product.id !== action.payload.id);

      localStorage.setItem(
        'favorites',
        JSON.stringify(filteredList),
      );
      state.favorites = filteredList;
    },
  },
});

export const {
  addFavoriteProduct,
  removeFavoriteProduct,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
