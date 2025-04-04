/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';

type PhoneState = {
  items: Phone[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedPhone: Phone | null;
};

const API_URL = 'api/phones.json';

const initialState: PhoneState = {
  items: [],
  status: 'idle',
  selectedPhone: null,
};

export const fetchPhones = createAsyncThunk('phones/fetchPhones', async () => {
  const response = await fetch(API_URL);

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
    setPhones(state, action: PayloadAction<Phone[]>) {
      state.items = action.payload;
    },
    setSelectedPhone(state, action: PayloadAction<string>) {
      state.selectedPhone =
        state.items.find(phone => phone.id === action.payload) || null;
    },
    resetStatus(state) {
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
