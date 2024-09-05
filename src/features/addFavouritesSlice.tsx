/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/products';

interface FavouritesState {
  items: Product[];
}

const initialState: FavouritesState = {
  items: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

const addFavouritesSlice = createSlice({
  name: 'addedFavourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('favourites', JSON.stringify(state.items));
      }
    },
    removeFavourite: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { addFavourite, removeFavourite } = addFavouritesSlice.actions;

export default addFavouritesSlice.reducer;
