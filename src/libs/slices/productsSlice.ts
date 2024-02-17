/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../utils/fetchProducts';
import { Product } from '../types';

export interface ProductsState {
  loaded: boolean,
  hasError: boolean,
  items: Product[]
}

const initialState: ProductsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchAll = createAsyncThunk(
  'products/fetchAll',
  async (url: string) => {
    const products = await client.get<Product[]>(url);

    return products;
  },
);

const productsSlice = createSlice(
  {
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        })
        .addCase(fetchAll.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.items = payload;
        })
        .addCase(fetchAll.rejected, (state) => {
          state.loaded = true;
          state.hasError = false;
        });
    },
  },
);

export default productsSlice.reducer;
