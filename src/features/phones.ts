import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as ProductDetails[],
};

export const loadPhones = createAsyncThunk('phones/fetch', async () => {
  return getProductsByCategory('phones');
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPhones.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadPhones.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadPhones.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
