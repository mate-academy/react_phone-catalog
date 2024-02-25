/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { getAllProducts } from '../api/allProducts';

export interface IProductsState {
  loaded: boolean,
  hasError: boolean,
  allProducts: IProduct[],
}

const initialState: IProductsState = {
  loaded: false,
  hasError: false,
  allProducts: [],
};

export const fetchAll = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const products = await getAllProducts();

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
          state.allProducts = payload;
        })
        .addCase(fetchAll.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
        });
    },
  },
);

export default productsSlice.reducer;
