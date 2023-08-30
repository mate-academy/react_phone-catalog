/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { PageType } from '../types/PageType';

const favoriteProducts
  = JSON.parse(localStorage.getItem(PageType.Favorites) || '[]');

type FavoritesState = {
  favorites: Product[];
};

const initialState: FavoritesState = {
  favorites: favoriteProducts,
};

const favoritesSlice = createSlice({
  name: PageType.Favorites,
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Product>) => {
      localStorage.setItem(
        PageType.Favorites,
        JSON.stringify([...state.favorites, action.payload]),
      );
      state.favorites.push(action.payload);
    },
    removeFavoriteProduct: (state, action: PayloadAction<Product>) => {
      const filteredList
        = state.favorites.filter(product => product.id !== action.payload.id);

      localStorage.setItem(
        PageType.Favorites,
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
