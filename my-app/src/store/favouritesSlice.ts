import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FavouritesState, Product } from '../types';

const STORAGE_KEY = 'favourites';

function loadFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const initialState: FavouritesState = {
  items: loadFromStorage(),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(
        (item) => item.itemId === action.payload.itemId,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(state.items);
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
