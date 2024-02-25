/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../helpers/types/Product';
import { localStorageService }
  from '../../helpers/funcService/localStorageService';

const key = 'favorites';

export interface FavoritesState {
  favorites: Product[],
}

const initialState: FavoritesState = {
  favorites: localStorageService.getLocalStorageData(key),
};

export const favoritesSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToFavorites: (state: FavoritesState, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
      localStorageService.setLocalStorageData(key, state.favorites);
    },

    removeFromFavorites:
      (state: FavoritesState, action: PayloadAction<Product>) => {
        state.favorites = state.favorites
          .filter(favorite => favorite.id !== action.payload.id);
        localStorageService.setLocalStorageData(key, state.favorites);
      },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
