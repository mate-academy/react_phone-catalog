import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types';

const productDetailsAdapter = createEntityAdapter({
  selectId: (productDetails: ProductDetails) => productDetails.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: productDetailsAdapter.getInitialState(),
  reducers: {
    setProductDetails: productDetailsAdapter.setAll,
  },
});

export const { reducer, actions } = productDetailsSlice;
