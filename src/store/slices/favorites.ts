import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFromLocalStorage<Product>('favorites'),
  reducers: {
    add: (favorites, action) => {
      const updated = [...favorites, action.payload];

      saveToLocalStorage('favorites', updated);

      return updated;
    },

    remove: (favorites, action) => {
      const updated = favorites.filter(
        product => product.id !== action.payload.id,
      );

      saveToLocalStorage('favorites', updated);

      return updated;
    },
  },
});
