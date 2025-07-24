import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type FavoritesState = {
  favorites: Product[];
};

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const updatedLocalStorage = (products: Product[]) => {
  localStorage.setItem('favorites', JSON.stringify(products));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductToFavorites: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
      updatedLocalStorage(state.favorites);
    },
    removeProductFromFavorites: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.favorites = state.favorites.filter(
        item => item !== null && item.id !== action.payload.id,
      );
      updatedLocalStorage(state.favorites);
    },
  },
});

export default favoritesSlice.reducer;
export const { addProductToFavorites, removeProductFromFavorites } =
  favoritesSlice.actions;
