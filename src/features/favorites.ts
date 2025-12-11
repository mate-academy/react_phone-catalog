import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Product } from '../types/Product';

interface FavoritesState {
  items: Product[];
}

const loadFromStorage = (): Product[] => {
  try {
    const serializedState = localStorage.getItem('favorites');

    if (serializedState === null) {
      return [];
    }

    return JSON.parse(serializedState) as Product[];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.itemId === product.itemId,
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleFavorites } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.items.length;
export const selectIsFavorite = (state: RootState, productId: string) =>
  state.favorites.items.some(item => item.itemId === productId);

export default favoritesSlice.reducer;
