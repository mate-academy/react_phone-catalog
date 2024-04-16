/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessories } from '../api/api';
import { Product } from '../types/Product';

export interface TabletsState {
  accessories: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: TabletsState = {
  accessories: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('accessories/fetch', async () => {
  const tablets = await getAccessories;

  return tablets;
});

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.accessories = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default tabletsSlice.reducer;
