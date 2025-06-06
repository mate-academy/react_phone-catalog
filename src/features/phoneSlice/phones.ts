/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phones } from '../../types/Phones';
import { getPhones } from '../../api/phones';

type InitialState = {
  loading: boolean;
  hasError: boolean;
  products: Phones[];
};

const initialState: InitialState = {
  loading: false,
  hasError: false,
  products: [],
};

export const fetchPhones = createAsyncThunk('fetch/phones', getPhones);

const phonesSlicer = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPhones.pending, s => {
      s.loading = true;
    });
    builder.addCase(fetchPhones.fulfilled, (s, a) => {
      s.products = a.payload;
      s.loading = false;
    });
    builder.addCase(fetchPhones.rejected, s => {
      s.hasError = true;
      s.loading = false;
    });
  },
});

export const {} = phonesSlicer.actions;
export default phonesSlicer.reducer;
