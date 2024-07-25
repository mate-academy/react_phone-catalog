/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ChosenItemsType = {
  favourite: Product[];
  cart: Product[];
};

const initialState: ChosenItemsType = {
  favourite: [],
  cart: [],
};

const chosenItemsSlice = createSlice({
  name: 'chosenItems',
  initialState,
  reducers: {
    setAddToFavourite: (state, action: PayloadAction<Product>) => {
      state.favourite.push(action.payload);
    },
    setDeleteFromFavourite: (state, action: PayloadAction<Product>) => {
      const index = state.favourite.findIndex(
        obj => obj.id === action.payload.id,
      );

      state.favourite.splice(index, 1);
    },
    setAddToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
  },
});

export default chosenItemsSlice.reducer;
export const { setAddToFavourite, setDeleteFromFavourite, setAddToCart } =
  chosenItemsSlice.actions;
