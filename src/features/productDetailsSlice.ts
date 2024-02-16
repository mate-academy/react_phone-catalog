import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';
import { fetchClient } from '../helpers/fetchClient';

export interface ProductDetailsState {
  productDetails: ProductDetails | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  loaded: false,
  hasError: false,
};

export const getProductDetails = createAsyncThunk(
  'productDetails/fetch', (productId: string) => {
    return fetchClient.get<ProductDetails>(`/products/${productId}.json`);
  },
);

export const productsDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    removeProduct: (state) => {
      return {
        ...state,
        product: null,
        loaded: false,
        hasError: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, () => {
        return {
          productDetails: null,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(getProductDetails.fulfilled, (_, action) => {
        return {
          productDetails: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(getProductDetails.rejected, () => {
        return {
          productDetails: null,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export default productsDetailsSlice.reducer;
