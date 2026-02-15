/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tablet } from '../types/Tablets';

export interface TabletState {
  items: Tablet[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedTablet: Tablet | null;
}

const initialState: TabletState = {
  items: [],
  status: 'idle',
  selectedTablet: null,
};

export const fetchTablets = createAsyncThunk(
  'tablets/fetchTablets',
  async () => {
    const response = await fetch('api/tablets.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    return data;
  },
);

export const tabletSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {
    setTablets(state, action) {
      state.items = action.payload;
    },
    setSelectedTablet(state, action: PayloadAction<string>) {
      const tablet = state.items.find(tabl => tabl.id === action.payload);

      state.selectedTablet = tablet || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTablets.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTablets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTablets.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setTablets, setSelectedTablet } = tabletSlice.actions;

export default tabletSlice.reducer;
