import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as ProductDetails[],
};

export const loadTablets = createAsyncThunk('tablets/fetch', async () => {
  return getProductsByCategory('tablets');
});

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTablets.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadTablets.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadTablets.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
