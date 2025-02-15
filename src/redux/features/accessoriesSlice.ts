/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types/Device';

const DATA_LINK = 'https://ab760e2cb2ffdd0c.mokky.dev/accessories';

export interface AccessoriesState {
  accessories: Device[];
  error: boolean;
  loading: boolean;
}

const initialState: AccessoriesState = {
  accessories: [],
  error: false,
  loading: true,
};

export const fetchAccessories = createAsyncThunk(
  'accessories/fetch',
  async () => {
    const response = await fetch(DATA_LINK);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const accessories = await response.json();

    return accessories as Device[];
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAccessories.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchAccessories.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.accessories = action.payload;
        state.error = false;
        state.loading = false;
      },
    );

    builder.addCase(fetchAccessories.rejected, state => {
      state.accessories = [];
      state.error = true;
      state.loading = false;
    });
  },
});

export default accessoriesSlice.reducer;
