/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';
import { Product } from '../types';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
};

export const fetchProducts = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.slice(0, 3);
      state.loading = false;
    });

    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const { reducer, actions } = productsSlice;
