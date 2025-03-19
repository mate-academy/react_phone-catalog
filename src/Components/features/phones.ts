/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Phone } from '../../types/product';

type PhonesState = {
  phones: Phone[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: PhonesState = {
  phones: null,
  loading: false,
  error: null,
};

export const fetchPhones = createAsyncThunk<Phone[]>(
  'phones/fetchPhones',
  async () => {
    const response = await fetch('/react_phone-catalog/api/phones.json');

    if (!response.ok) {
      throw new Error('Failed to fetch phones');
    }

    return response.json();
  },
);

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhones.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.loading = false;
        state.phones = action.payload;
      })
      .addCase(fetchPhones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
