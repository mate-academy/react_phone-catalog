/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getHotPrices } from '../api/api';

export interface HotPricesState {
  hotPrices: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: HotPricesState = {
  hotPrices: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('hotPrices/fetch', async () => {
  const products = await getHotPrices;

  return products;
});

const hotPricesSlice = createSlice({
  name: 'hotPrices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.hotPrices = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default hotPricesSlice.reducer;
