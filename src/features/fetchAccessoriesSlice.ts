/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessories } from '../api';
import { Accessory } from '../types/Accessory';

type AccessoriesType = {
  objects: Accessory[];
  loading: boolean;
  error: string;
};

const initialState: AccessoriesType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchAccessoriesAsync = createAsyncThunk(
  'accesories/fetch',
  async () => {
    const AccessoriesList = await getAccessories();

    return AccessoriesList;
  },
);

const getAccessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchAccessoriesAsync.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAccessoriesAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchAccessoriesAsync.rejected, state => {
        state.loading = false;
        state.error = 'failed to load accessories';
      });
  },
});

export default getAccessoriesSlice.reducer;
