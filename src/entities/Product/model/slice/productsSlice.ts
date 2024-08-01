/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts';
import { ProductSchema } from '../types/product';

const initialState: ProductSchema = {
  products: [],
  isLoading: false,
  error: false,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, state => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { name: ProductSliceName } = ProductSlice;
export const { reducer: ProductSliceReducer } = ProductSlice;
