/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhones } from '../api/api';
import { Product } from '../types/Product';

export interface PhonesState {
  phones: Product[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PhonesState = {
  phones: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('phones/fetch', async () => {
  const phones = await getPhones;

  return phones;
});

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.phones = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default phonesSlice.reducer;
