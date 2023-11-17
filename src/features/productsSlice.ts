/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Product } from '../types/Product';
import { getProducts } from '../api/product';

export type ProductsState = {
  products: Product[];
  status: Status;
};

const initialState: ProductsState = {
  products: [],
  status: Status.IDLE,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  () => getProducts(),
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { actions } = productsSlice;
export default productsSlice.reducer;
