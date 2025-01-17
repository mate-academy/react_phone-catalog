import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type Favorites = {
  favoriteProducts: Product[];
};

const initialState: Favorites = {
  favoriteProducts: JSON.parse(
    localStorage.getItem('favorites') || '[]',
  ).filter(product => product?.id != null && product.id !== ''),
};

const syncFavoritesWithLocalStorage = (favorites: Product[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      state.favoriteProducts.push(action.payload);
      syncFavoritesWithLocalStorage(state.favoriteProducts);
    },
    removeFavorite: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.favoriteProducts = state.favoriteProducts.filter(
        item => item.id !== action.payload.id,
      );
      syncFavoritesWithLocalStorage(state.favoriteProducts);
    },
  },
});

export default favoritesSlice.reducer;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
