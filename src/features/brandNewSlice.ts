/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface BrandNewProductsState {
  brandNew: Product[];
}

const initialState: BrandNewProductsState = {
  brandNew: [],
};

const brandNewSlice = createSlice({
  name: 'brandNew',
  initialState,
  reducers: {
    setBrandNew: (state, action: PayloadAction<Product[]>) => {
      state.brandNew = action.payload;
    },
  },
});

export const { setBrandNew } = brandNewSlice.actions;
export default brandNewSlice.reducer;
