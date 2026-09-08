/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phones } from '../types/Phones';

export interface PhonesState {
  items: Phones[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedPhone: Phones | null;
}

const initialState: PhonesState = {
  items: [],
  status: 'idle',
  selectedPhone: null,
};

export const fetchPhones = createAsyncThunk('phones/fetchPhones', async () => {
  const response = await fetch('api/phones.json');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  await new Promise(resolve => setTimeout(resolve, 500));

  return data;
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setPhones(state, action: PayloadAction<Phones[]>) {
      state.items = action.payload;
    },
    setSelectedPhone(state, action: PayloadAction<string>) {
      const phone = state.items.find(phon => phon.id === action.payload);

      state.selectedPhone = phone || null;
    },
    resetStatus: state => {
      state.status = 'idle';
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

export const { setPhones, setSelectedPhone, resetStatus } = phonesSlice.actions;

export default phonesSlice.reducer;
