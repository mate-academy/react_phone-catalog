import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

type FavouritesState = Product[];

const initialState: FavouritesState = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    add: (favourites, action: PayloadAction<Product>) => {
      favourites.push(action.payload);
    },
    remove: (favourites, action: PayloadAction<string>) => {
      return favourites.filter(item => item.id !== action.payload);
    },
  },
});

export const { add, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;
