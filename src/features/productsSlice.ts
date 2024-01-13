/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../helpers/types/ProductType';
import { getProducts } from '../api/api';

export interface ProductsState {
  products: ProductType[],
  isLoading: boolean,
  hasError: boolean,
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await getProducts();

    return products;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});

export default productsSlice.reducer;
