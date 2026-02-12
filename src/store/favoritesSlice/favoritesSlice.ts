import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllProducts } from '../../shared/types/AllProducts/AllProducts';

export type Favorites = AllProducts[];

const loadStateFromLocalStorage = () => {
  const savedItems = localStorage.getItem('favorites');

  if (savedItems) {
    return JSON.parse(savedItems);
  }

  return [];
};

export const initialState: Favorites = loadStateFromLocalStorage();

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoritesProduct: (state, action: PayloadAction<AllProducts>) => {
      const newState = [...state, action.payload];

      localStorage.setItem('favorites', JSON.stringify(newState));

      return newState;
    },
    deleteFavoritesProduct: (state, action: PayloadAction<number>) => {
      const newState = state.filter(favorite => favorite.id !== action.payload);

      localStorage.setItem('favorites', JSON.stringify(newState));

      return newState;
    },
  },
});

export const { addFavoritesProduct, deleteFavoritesProduct } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
