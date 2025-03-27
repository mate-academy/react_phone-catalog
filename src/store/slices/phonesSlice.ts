/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

export interface PhoneState {
  phones: Product[];
  loading: boolean;
  error: string | null;
  phonesLength: number;
}

const initialState: PhoneState = {
  phones: [],
  loading: false,
  error: null,
  phonesLength: 0,
};

export const fetchPhones = createAsyncThunk('phones/fetchPhones', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const response = await fetch('./api/products.json');
  const data: Product[] = await response.json();

  return data.filter(item => item.category === 'phones');
});

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhones.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPhones.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.phones = action.payload;
          state.phonesLength = action.payload.length;
        },
      )
      .addCase(fetchPhones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch phones';
      });
  },
});

export default phoneSlice.reducer;
