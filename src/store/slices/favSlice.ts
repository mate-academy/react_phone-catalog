/* eslint-disable max-len */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../helpers/types/Product';
import { getLocalStorageData, setLocalStorageData } from '../../helpers/functionService/getLocalStorage';

export interface FavoritesState {
  favorites: Product[];
}

const key = 'favorites';

const initialState: FavoritesState = {
  favorites: getLocalStorageData(key),
};

const favoritesSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
      setLocalStorageData(key, state.favorites);
    },
    deleteFromFavorites: (state, action: PayloadAction<string>) => {
      const updatedFavorites = state.favorites.filter(
        (item) => item.id !== action.payload,
      );

      setLocalStorageData(key, updatedFavorites);

      return {
        ...state,
        favorites: updatedFavorites,
      };
    },
  },
});

export const {
  addToFavorites,
  deleteFromFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
