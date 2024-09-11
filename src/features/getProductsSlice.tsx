/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/products';

interface SetProductsInterface {
  items: Product[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: SetProductsInterface = {
  items: [],
  hasError: false,
  loaded: false,
};

export const getProductsAsync = createAsyncThunk(
  'products/getProductsSlice',
  async () => {
    const response = await fetch('api/products.json');
    const products = await response.json();

    return products;
  },
);

export const getProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getProductsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default getProductsSlice.reducer;
