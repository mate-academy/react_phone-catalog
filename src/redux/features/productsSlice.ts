/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

const DATA_LINK = 'https://ab760e2cb2ffdd0c.mokky.dev/products?';

interface FetchProductsParams {
  category?: string;
  sortBy?: string;
  query?: string;
}

export interface ProductState {
  products: Product[];
  error: boolean;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  error: false,
  loading: true,
};

export const fetchProducts = createAsyncThunk<Product[], FetchProductsParams>(
  'products/fetch',
  async ({ category, sortBy, query: name } = {}) => {
    const response = await fetch(
      `${DATA_LINK}${category ? `category=${category}` : ''}&${sortBy ? `sortBy=${sortBy}` : ''}&${name ? `name=*${name}*` : ''}`,
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const products = await response.json();

    return products as Product[];
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(fetchProducts.rejected, state => {
      state.products = [];
      state.error = true;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
