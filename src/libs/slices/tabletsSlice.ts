/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { getTablets } from '../api/tablets';

export interface ITabletsState {
  loaded: boolean,
  hasError: boolean,
  products: IProduct[],
}

const initialState: ITabletsState = {
  loaded: false,
  hasError: false,
  products: [],
};

export const fetchTablets = createAsyncThunk(
  'products/fetchTablets',
  async () => {
    const phones = await getTablets();

    return phones;
  },
);

const tabletsSlice = createSlice(
  {
    name: 'tablets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTablets.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.products = payload;
        })
        .addCase(fetchTablets.pending, (state) => {
          state.loaded = false;
          state.hasError = false;
        })
        .addCase(fetchTablets.rejected, (state) => {
          state.loaded = true;
          state.hasError = true;
        });
    },
  },
);

export default tabletsSlice.reducer;
