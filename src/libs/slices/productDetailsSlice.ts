/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProductDetails, ProductCategory } from '../types';
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
  async (
    payload: {
      id: string,
      category: ProductCategory,
    },
  ) => {
    const productDetails = await getProductDetails(
      payload.id,
      payload.category,
    );

    return productDetails ?? null;
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
