import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as ProductDetails[],
};

export const loadAccessories = createAsyncThunk(
  'accessories/fetch',
  async () => {
    return getProductsByCategory('accessories');
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAccessories.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadAccessories.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadAccessories.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
