/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../helpers/types/ProductType';

const initialState: ProductType[] = [];

export const favouriteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToFavourite: (favouritesProducts, action: PayloadAction<ProductType>) => {
      favouritesProducts.push(action.payload);
    },
    removeFromFavourite: (favouritesProducts, action: PayloadAction<string>) => {
      return favouritesProducts
        .filter(prod => prod.id !== action.payload);
    },
  },
});

export default favouriteSlice.reducer;
export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;
