/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types/Device';

const DATA_LINK = 'https://ab760e2cb2ffdd0c.mokky.dev/phones';

export interface PhonesState {
  phones: Device[];
  error: boolean;
  loading: boolean;
}

const initialState: PhonesState = {
  phones: [],
  error: false,
  loading: true,
};

export const fetchPhones = createAsyncThunk('phones/fetch', async () => {
  const response = await fetch(DATA_LINK);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const phones = await response.json();

  return phones as Device[];
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPhones.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchPhones.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.phones = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(fetchPhones.rejected, state => {
      state.phones = [];
      state.error = true;
      state.loading = false;
    });
  },
});

export default phonesSlice.reducer;
