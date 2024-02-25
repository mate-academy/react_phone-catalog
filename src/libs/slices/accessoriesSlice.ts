/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { getAccessories } from '../api/accessories';

export interface IAccessoriesState {
  loaded: boolean,
  hasError: boolean,
  products: IProduct[],
}

const initialState: IAccessoriesState = {
  loaded: false,
  hasError: false,
  products: [],
};

export const fetchAccessories = createAsyncThunk(
  'products/fetchAccessories',
  async () => {
    const phones = await getAccessories();

    return phones;
  },
);
const accessoriesSlice = createSlice(
  {
    name: 'accessories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAccessories.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.products = payload;
        })
        .addCase(fetchAccessories.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        })
        .addCase(fetchAccessories.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
        });
    },
  },
);

export default accessoriesSlice.reducer;
