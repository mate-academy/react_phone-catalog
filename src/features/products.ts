import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Product[],
};

export const loadProducts = createAsyncThunk('products/fetch', async () => {
  return getProducts();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadProducts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadProducts.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadProducts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
