/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

type TabletsState = {
  tablets: Product[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: TabletsState = {
  tablets: null,
  loading: false,
  error: null,
};

export const fetchTablets = createAsyncThunk<Product[]>(
  'tablets/fetchTablets',
  async () => {
    const response = await fetch('/react_phone-catalog/api/tablets.json');

    if (!response.ok) {
      throw new Error('Failed to fetch tablets');
    }

    return response.json();
  },
);

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTablets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablets.fulfilled, (state, action) => {
        state.loading = false;
        state.tablets = action.payload;
      })
      .addCase(fetchTablets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
