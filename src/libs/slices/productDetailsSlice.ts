/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProductDetails } from '../types';
import { getProductDetails } from '../api/product';

export interface IProductDetailsState {
  loaded: boolean,
  hasError: boolean,
  productDetails: IProductDetails | null,
}

const initialState: IProductDetailsState = {
  loaded: false,
  hasError: false,
  productDetails: null,
};

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProduct',
  async (id: string) => {
    const productDetails = await getProductDetails(id);

    return productDetails;
  },
);

const productDetailsSlice = createSlice(
  {
    name: 'productsDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.productDetails = payload;
        })
        .addCase(fetchProductDetails.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
          state.productDetails = null;
        })
        .addCase(fetchProductDetails.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        });
    },
  },
);

export default productDetailsSlice.reducer;
