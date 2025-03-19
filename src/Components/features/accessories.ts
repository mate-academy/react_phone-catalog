/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

type AccessoriesState = {
  accessories: Product[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: AccessoriesState = {
  accessories: null,
  loading: false,
  error: null,
};

export const fetchAccessories = createAsyncThunk<Product[]>(
  'accessories/fetchAccessories',
  async () => {
    const response = await fetch('/react_phone-catalog/api/accessories.json');

    if (!response.ok) {
      throw new Error('Failed to fetch accessories');
    }

    return response.json();
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAccessories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload;
      })
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
