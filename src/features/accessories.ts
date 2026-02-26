/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Smartwatch } from '../types/Accessories';

export interface AccessoriesState {
  items: Smartwatch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedAcces: Smartwatch | null;
}

const initialState: AccessoriesState = {
  items: [],
  status: 'idle',
  selectedAcces: null,
};

export const fetchAccessories = createAsyncThunk(
  'accessories/fetchAccessories',
  async () => {
    const response = await fetch('api/accessories.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    return data;
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {
    setAccessories(state, action) {
      state.items = action.payload;
    },
    setSelectedAcces(state, action: PayloadAction<string>) {
      const acces = state.items.find(acc => acc.id === action.payload);

      state.selectedAcces = acces || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAccessories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAccessories.rejected, state => {
        state.status = 'failed';
      });
  },
});
export const { setAccessories, setSelectedAcces } = accessoriesSlice.actions;

export default accessoriesSlice.reducer;
