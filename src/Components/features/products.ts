/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductInfo } from '../../types/productInfo';

type ProductsState = {
  products: ProductInfo[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<ProductInfo[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/react_phone-catalog/api/products.json');

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
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
