/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { getPhones } from '../api/phones';

export interface IPhonesState {
  loaded: boolean,
  hasError: boolean,
  products: IProduct[],
}

const initialState: IPhonesState = {
  loaded: false,
  hasError: false,
  products: [],
};

export const fetchPhones = createAsyncThunk(
  'products/fetchPhones',
  async () => {
    const phones = await getPhones();

    return phones;
  },
);

const phonesSlice = createSlice(
  {
    name: 'phones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPhones.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.products = payload;
        })
        .addCase(fetchPhones.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        })
        .addCase(fetchPhones.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
        });
    },
  },
);

export default phonesSlice.reducer;
