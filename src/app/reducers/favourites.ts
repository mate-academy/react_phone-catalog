/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

type FavouritesState = {
  items: Product[];
};

const loadFavouritesFromLocalStorage = (): Product[] => {
  const storedFavourites = localStorage.getItem('favourites');

  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

const initialState: FavouritesState = {
  items: loadFavouritesFromLocalStorage(),
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites(state, action: PayloadAction<Product[]>) {
      state.items = [...state.items, ...action.payload];

      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
    deleteFavourites(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        item => item.itemId !== action.payload && item.id !== action.payload,
      );

      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { setFavourites, deleteFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
