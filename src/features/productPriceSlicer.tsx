/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type PriceState = {
  total: number;
};

const priceState: PriceState = {
  total: 1,
};

export const productPriceSlicer = createSlice({
  name: 'price',
  initialState: priceState,
  reducers: {
    addProductPrice: (state, action) => {
      const { quantity } = action.payload;

      state.total += quantity;
    },
    deleteProductPrice: (state, action) => {
      const { quantity } = action.payload;

      state.total -= quantity;
    },
  },
});

export const { addProductPrice, deleteProductPrice }
  = productPriceSlicer.actions;

export default productPriceSlicer.reducer;
