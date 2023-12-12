/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../api/productDetails';

export type ProductDetailsState = {
  productDetails: ProductDetails | null;
  status: Status;
};

const initialState: ProductDetailsState = {
  productDetails: null,
  status: Status.IDLE,
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetch',
  (productId: string) => getProductDetails(productId),
);

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { actions } = productDetailsSlice;
export default productDetailsSlice.reducer;
