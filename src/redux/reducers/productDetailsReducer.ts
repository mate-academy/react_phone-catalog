/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { getProductDetails } from '../thunks/product.thunk';

type ProductDetailsState = {
  data: ProductDetailsType | null,
  isLoading: boolean,
  isError: boolean,
};

const initialState: ProductDetailsState = {
  data: null,
  isLoading: false,
  isError: false,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })

      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productDetailsSlice.reducer;
