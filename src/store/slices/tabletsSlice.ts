/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

export interface TabletsState {
  tablets: Product[];
  loading: boolean;
  error: string | null;
  tabletsLength: number;
}

const initialState: TabletsState = {
  tablets: [],
  loading: false,
  error: null,
  tabletsLength: 0,
};

export const fetchTablets = createAsyncThunk(
  'tablets/fetchTablets',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('./api/products.json');
    const data: Product[] = await response.json();

    return data.filter(item => item.category === 'tablets');
  },
);

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTablets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTablets.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.tablets = action.payload;
          state.tabletsLength = action.payload.length;
        },
      )
      .addCase(fetchTablets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tablets';
      });
  },
});

export default tabletsSlice.reducer;
