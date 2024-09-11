/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Accessories } from '../types/accessories';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface setAccessoriesInterface {
  items: Accessories[];
  error: boolean;
  loaded: boolean;
}

const initialState: setAccessoriesInterface = {
  items: [],
  error: false,
  loaded: false,
};

export const getAccessoriesAsync = createAsyncThunk(
  'products/getAccessoriesSlice',
  async () => {
    const response = await fetch('api/accessories.json');
    const accessoriesProducts = await response.json();

    return accessoriesProducts;
  },
);

export const getAccessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAccessoriesAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getAccessoriesAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getAccessoriesAsync.rejected, state => {
        state.error = true;
        state.loaded = true;
      });
  },
});

export default getAccessoriesSlice.reducer;
