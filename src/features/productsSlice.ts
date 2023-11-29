/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

export interface ProductState {
  products: Product[];
  loading: boolean;
  hasError: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productsFromServer = await getProducts();

    return productsFromServer;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
