/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tablet } from '../types/tablets';

interface SetTabletsProps {
  items: Tablet[];
  loaded: boolean;
  error: boolean;
}

const initialState: SetTabletsProps = {
  items: [],
  loaded: false,
  error: false,
};

export const getTabletsAsync = createAsyncThunk(
  'products/getTabletsSlice',
  async () => {
    const response = await fetch('api/tablets.json');

    const tabletsProducts = await response.json();

    return tabletsProducts;
  },
);

export const getTabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTabletsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getTabletsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getTabletsAsync.rejected, state => {
        state.error = true;
        state.loaded = true;
      });
  },
});

export default getTabletsSlice.reducer;
