/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { Tablet, Category } from '../types';

type TabletsState = {
  tablets: Tablet[];
  loading: boolean;
  error: string;
};

const initialState: TabletsState = {
  tablets: [],
  loading: false,
  error: '',
};

export const fetchTablets = createAsyncThunk('tablets/fetch', () => {
  return getProductsByCategory<Tablet[]>(Category.Tablets);
});

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Tablet[]>) => {
      state.tablets = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTablets.fulfilled, (state, action) => {
      state.tablets = action.payload.slice(0, 8);
      state.loading = false;
    });

    builder.addCase(fetchTablets.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchTablets.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const { reducer, actions } = tabletsSlice;
