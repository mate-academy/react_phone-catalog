// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: [] as Product[],
  reducers: {
    addToFavourite: (favourite, action) => [...favourite, action.payload],
    removeFromFavourite: (favourite, action) => {
      return favourite.filter((item: Product) => item.id !== action.payload.id);
    },
  },
});
