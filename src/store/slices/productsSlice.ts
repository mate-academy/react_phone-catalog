/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/product';

// Define the state structure
export interface ProductState {
  loading: boolean;
  products: { [category: string]: Product[] }; // Dynamic product categories
  error: string;
}

// Initial state
const initialState: ProductState = {
  loading: false,
  products: {},
  error: '',
};
// Dynamic API call for any product category

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category: string) => {
    const response = await axios.get(`../../../public/api/${category}.json`); // Fetch dynamically

    return { category, data: response.data };
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ category: string; data: Product[] }>,
        ) => {
          state.loading = false;
          state.products[action.payload.category] = action.payload.data;
          // .reverse()
          // .slice(4);
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export default productsSlice.reducer;
