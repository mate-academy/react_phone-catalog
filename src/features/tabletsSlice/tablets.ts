/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tablets } from '../../types/Tablets';
import { getTablets } from '../../api/tablets';

type InitialState = {
  loading: boolean;
  hasError: boolean;
  products: Tablets[];
};

const initialState: InitialState = {
  loading: false,
  hasError: false,
  products: [],
};

export const fetchTablets = createAsyncThunk('fetch/tablets', getTablets);

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTablets.pending, s => {
      s.loading = true;
    });

    builder.addCase(fetchTablets.fulfilled, (s, a) => {
      s.loading = false;
      s.products = a.payload;
    });

    builder.addCase(fetchTablets.rejected, s => {
      s.loading = false;
      s.hasError = true;
    });
  },
});

export default tabletsSlice.reducer;
export const {} = tabletsSlice.actions;
