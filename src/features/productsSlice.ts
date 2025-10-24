import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types';

export const productsAdapter = createEntityAdapter({
  selectId: (product: Product) => product.itemId,
  sortComparer: (a, b) => b.year - a.year,
});

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    setProducts: productsAdapter.setAll,
  },
});

export const { reducer, actions } = productsSlice;
