/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Products } from '../../types/Products';
import { getProducts } from '../../api/products';

type InitialState = {
  loading: boolean;
  hasError: boolean;
  products: Products[];
};

const initialState: InitialState = {
  loading: true,
  hasError: false,
  products: [],
};

export const fetchProducts = createAsyncThunk('fetch/products', getProducts);

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, s => {
      s.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (s, a) => {
      s.loading = false;
      s.products = a.payload;
    });

    builder.addCase(fetchProducts.rejected, s => {
      s.loading = false;
      s.hasError = true;
    });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
