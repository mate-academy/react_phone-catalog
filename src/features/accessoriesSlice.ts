/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { Accessory, Category } from '../types';

type AccessoriesState = {
  accessories: Accessory[];
  loading: boolean;
  error: string;
};

const initialState: AccessoriesState = {
  accessories: [],
  loading: false,
  error: '',
};

export const fetchAccessories = createAsyncThunk('accessories/fetch', () => {
  return getProductsByCategory<Accessory[]>(Category.Accessories);
});

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Accessory[]>) => {
      state.accessories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccessories.fulfilled, (state, action) => {
      state.accessories = action.payload.slice(0, 8);
      state.loading = false;
    });

    builder.addCase(fetchAccessories.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchAccessories.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const { reducer, actions } = accessoriesSlice;
