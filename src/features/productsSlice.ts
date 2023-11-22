/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  hasError: false,
};

export const productsAsync = createAsyncThunk(
  'products/fetchProducts',
  () => getProducts(),
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(productsAsync.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { actions } = productsSlice;
export default productsSlice.reducer;
