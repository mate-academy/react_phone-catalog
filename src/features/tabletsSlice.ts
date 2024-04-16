/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTablets } from '../api/api';
import { Product } from '../types/Product';

export interface TabletsState {
  tablets: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: TabletsState = {
  tablets: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('tablets/fetch', async () => {
  const tablets = await getTablets;

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
        state.tablets = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default tabletsSlice.reducer;
