import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../models/productDetails';
import { fetchClient } from '../../utils/fetchClient';

interface ProductDetailsState {
  product: ProductDetails | null,
  isLoading: boolean,
  error: string,
}

const initialState: ProductDetailsState = {
  product: null,
  isLoading: false,
  error: '',
};

export const getProductDetails = createAsyncThunk(
  'productDetails/fetch', (productId: string) => {
    return fetchClient.get<ProductDetails>(`products/${productId}.json`);
  },
);

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductDetails.pending, () => {
        return {
          product: null,
          isLoading: true,
          error: '',
        };
      })
      .addCase(getProductDetails.fulfilled, (_, action) => {
        return {
          product: action.payload,
          isLoading: false,
          error: '',
        };
      })
      .addCase(getProductDetails.rejected, () => {
        return {
          product: null,
          isLoading: false,
          error: 'Product was not found on server',
        };
      });
  },
});

export default productDetailsSlice.reducer;
