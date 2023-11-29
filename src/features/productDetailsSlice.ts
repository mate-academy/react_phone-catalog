/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductDetails } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';

export interface ProductDetailsState {
  productDetails: ProductDetails | null;
  loadingDetails: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  loadingDetails: false,
  hasError: false,
};

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string) => {
    const productDetails = await getProductDetails(productId);

    return productDetails;
  },
);

export const productsDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loadingDetails = true;
        state.hasError = false;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.hasError = true;
        state.loadingDetails = false;
      });
  },
});

export default productsDetailsSlice.reducer;
