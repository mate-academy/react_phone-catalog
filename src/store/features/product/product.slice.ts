/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { TProduct } from 'utils/types/product.type';
import { getProducts } from './getProductsApi';

type ProductState = {
  products: TProduct[];
  filtered?: TProduct[];
  related?: TProduct[];
  loading: boolean;
  error: string | undefined;
};

const initialState: ProductState = {
  products: [],
  filtered: [],
  related: [],
  loading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, actions) => {
        state.products = [];
        state.error = actions.error.message;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
