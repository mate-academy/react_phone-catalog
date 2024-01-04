/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DetailType } from '../helpers/types/DetailType';
import { getProductDetails } from '../api/api';

export interface SelectedProductState {
  selectedProduct: DetailType | null,
  isLoading: boolean,
  hasError: boolean,
}

const initialState: SelectedProductState = {
  selectedProduct: null,
  isLoading: false,
  hasError: false,
};

export const fetchSelectedProduct = createAsyncThunk(
  'selectedProduct/fetchSelectedProduct',
  async (productId: string | null) => {
    const product = await getProductDetails(productId);

    return product;
  },
);

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedProduct.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSelectedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSelectedProduct.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default selectedProductSlice.reducer;
