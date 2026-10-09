/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../interface/interface';

export interface ProductsState {
  items: Product[];
  loading: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(
      `${import.meta.env.BASE_URL}/api/products.json`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default productsSlice.reducer;
