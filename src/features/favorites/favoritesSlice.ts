import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogProduct } from '../../../public/types';

export interface FavoritesState {
  items: CatalogProduct[];
}

const loadFavorites = (): CatalogProduct[] => {
  try {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);

    return [];
  }
};


const initialState: FavoritesState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<CatalogProduct>) => {
      const exists = state.items.find(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
