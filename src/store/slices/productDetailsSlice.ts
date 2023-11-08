/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../api/productDetails';

export interface ProductDetailsState {
  productDetails: ProductDetails | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  isLoading: false,
  hasError: false,
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetch',
  async (productId: string) => {
    const productDetails = await getProductDetails(productId);

    return productDetails;
  },
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
    });

    builder.addCase(fetchProductDetails.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export default productDetailsSlice.reducer;
