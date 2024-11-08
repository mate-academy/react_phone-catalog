/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { applySorting } from '@utils/helpers/sortByOptions';
import { TProduct } from '@utils/types/product.type';

import { getProducts } from './getProductsApi';

type ProductState = {
  products: TProduct[];
  loading: boolean;
  error: string | undefined;
  sortBy: string;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: undefined,
  sortBy: 'year',
};

export const productsSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setSortBy: (state, action: { payload: string }) => {
      state.sortBy = action.payload;
      state.products = applySorting(state.products, state.sortBy);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.products = applySorting(payload, state.sortBy);
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
export const { setSortBy } = productsSlice.actions;
