/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accessories } from '../../types/Accessories';

type AccessoriesState = {
  items: Accessories[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedAccessory: Accessories | null;
};

const API_URL = 'api/accessories.json';

const initialState: AccessoriesState = {
  items: [],
  status: 'idle',
  selectedAccessory: null,
};

export const fetchAccessories = createAsyncThunk(
  'accessories/fetchAccessories',
  async () => {
    const response = await fetch(API_URL);

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
    setAccessories(state, action: PayloadAction<Accessories[]>) {
      state.items = action.payload;
    },
    setSelectedAccessory(state, action: PayloadAction<string>) {
      state.selectedAccessory =
        state.items.find(acc => acc.id === action.payload) ?? null;
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
export const { setAccessories, setSelectedAccessory } =
  accessoriesSlice.actions;

export default accessoriesSlice.reducer;
