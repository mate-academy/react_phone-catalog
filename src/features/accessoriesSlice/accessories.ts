/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Accessories } from '../../types/Accessories';
import { getAccessories } from '../../api/accessories';

type InitialState = {
  loading: boolean;
  hasError: boolean;
  accessories: Accessories[];
};

const initialState: InitialState = {
  loading: false,
  hasError: false,
  accessories: [],
};

export const fetchAccessories = createAsyncThunk(
  'fetch/accessories',
  getAccessories,
);

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAccessories.pending, s => {
      s.loading = true;
    });

    builder.addCase(fetchAccessories.fulfilled, (s, a) => {
      s.accessories = a.payload;
      s.loading = false;
    });

    builder.addCase(fetchAccessories.rejected, s => {
      s.loading = false;
      s.hasError = true;
    });
  },
});

export const {} = accessoriesSlice.actions;
export default accessoriesSlice.reducer;
