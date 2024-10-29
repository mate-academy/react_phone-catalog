/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phones } from '../types/Phones';

export interface PhonesState {
  items: Phones[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PhonesState = {
  items: [],
  status: 'idle',
};

export const fetchPhones = createAsyncThunk('phones/fetchPhones', async () => {
  const response = await fetch('api/phones.json');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return data;
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setPhones(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhones.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPhones.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setPhones } = phonesSlice.actions;

export default phonesSlice.reducer;
