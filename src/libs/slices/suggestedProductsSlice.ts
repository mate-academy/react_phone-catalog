/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { getSuggestedProducts } from '../api/suggestedProducts';

export interface ISuggestedProductsState {
  loaded: boolean,
  hasError: boolean,
  suggestedProducts: IProduct[],
}

const initialState: ISuggestedProductsState = {
  loaded: false,
  hasError: false,
  suggestedProducts: [],
};

export const fetchSuggestedProducts = createAsyncThunk(
  'products/fetchSuggestedProducts',
  async () => {
    const products = await getSuggestedProducts();

    return products;
  },
);

const suggestedProductsSlice = createSlice(
  {
    name: 'suggestedProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSuggestedProducts.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        })
        .addCase(fetchSuggestedProducts.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.suggestedProducts = payload;
        })
        .addCase(fetchSuggestedProducts.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
        });
    },
  },
);

export default suggestedProductsSlice.reducer;
