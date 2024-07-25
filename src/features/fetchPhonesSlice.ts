/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhones } from '../api';
import { Phone } from '../types/Phone';

type PhonesType = {
  objects: Phone[];
  loading: boolean;
  error: string;
};

const initialState: PhonesType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchPhonesAsync = createAsyncThunk('phones/fetch', async () => {
  const phonesList = await getPhones();

  return phonesList;
});

const getPhonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPhonesAsync.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPhonesAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchPhonesAsync.rejected, state => {
        state.loading = false;
        state.error = 'failed to load phones';
      });
  },
});

export default getPhonesSlice.reducer;
