/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api';
import { Product } from '../types/Product';

type ProductsType = {
  objects: Product[];
  loading: boolean;
  error: string;
};

const initialState: ProductsType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetch',
  async () => {
    const productsList = await getProducts();

    return productsList;
  },
);

const getProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchProductsAsync.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchProductsAsync.rejected, state => {
        state.loading = false;
        state.error = 'failed to load products';
      });
  },
});

export default getProductsSlice.reducer;
