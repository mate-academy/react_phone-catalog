import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const savedFavourites = localStorage.getItem('favourites');

type FavouritesState = {
  items: Product[];
};

const initialState: { items: Product[] } = savedFavourites
  ? (JSON.parse(savedFavourites) as FavouritesState)
  : { items: [] };

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<Product>) {
      state.items.push(payload);
    },
    removeProduct(state, { payload }: PayloadAction<{ id: string }>) {
      return {
        items: state.items.filter(item => item.itemId !== payload.id),
      };
    },
  },
});
