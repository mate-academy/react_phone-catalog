/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

export interface AccessoriesState {
  accessories: Product[];
  loading: boolean;
  error: string | null;
  accessoriesLength: number;
}

const initialState: AccessoriesState = {
  accessories: [],
  loading: false,
  error: null,
  accessoriesLength: 0,
};

export const fetchAccessories = createAsyncThunk(
  'accessories/fetchAccessories',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('./api/products.json');
    const data: Product[] = await response.json();

    return data.filter(item => item.category === 'accessories');
  },
);

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAccessories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAccessories.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.accessories = action.payload;
          state.accessoriesLength = action.payload.length;
        },
      )
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accessories';
      });
  },
});

export default accessoriesSlice.reducer;
