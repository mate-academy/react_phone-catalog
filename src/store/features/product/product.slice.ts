/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { TProduct } from 'utils/types/product.type';
import { getProducts } from './getProductsApi';
import { applySorting } from '@utils/helpers/sortByOptions';

type ProductState = {
  products: TProduct[];
  filtered?: TProduct[];
  related?: TProduct[];
  loading: boolean;
  error: string | undefined;
  sortBy: string;
};

const initialState: ProductState = {
  products: [],
  filtered: [],
  related: [],
  loading: false,
  error: '',
  sortBy: 'year',
};

export const productsSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setSortBy: (state, actions) => {
      state.sortBy = actions.payload;
      state.products = applySorting(state.products, state.sortBy);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = applySorting(payload, state.sortBy);
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
export const { setSortBy } = productsSlice.actions;
