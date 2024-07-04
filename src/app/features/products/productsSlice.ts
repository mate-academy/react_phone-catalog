/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Product, QueryResponse } from '../../../types';
import { fetchProducts } from './fetchProducts';

type State = QueryResponse<{
  products: Product[];
}>;

const initialState: State = {
  error: '',
  products: [],
  status: 'idle',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(fetchProducts.rejected, (state, { error: { message } }) => {
        state.status = 'rejected';
        state.error = message || 'An error occured while fetching products';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.status = 'fulfilled';
      });
  },
});
