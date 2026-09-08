/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetails } from '../../modules/shared/Types/types';
import { getProductsByDetails } from '../../api/getProducts';

const initialState = {
  details: [] as ProductDetails[],
  isLoading: false,
  isError: false,
};

export interface DetailsToGet {
  category: string;
  productId: string;
}

export const getDetails = createAsyncThunk('fetch/details', (data: string) =>
  getProductsByDetails(data),
);

export const productDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setIsError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isError: action.payload,
    }),
  },

  extraReducers(builder) {
    builder.addCase(getDetails.pending, state => ({
      ...state,
      isLoading: true,
      isError: false,
    }));
    builder.addCase(getDetails.fulfilled, (state, action) => {
      return { ...state, details: action.payload, isLoading: false };
    });
    builder.addCase(getDetails.rejected, state => ({
      ...state,
      isError: true,
      isLoading: false,
    }));
  },
});

export const { setIsError } = productDetailsSlice.actions;
