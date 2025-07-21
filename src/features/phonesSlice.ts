/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { Phone, Category } from '../types';

type PhonesState = {
  phones: Phone[];
  loading: boolean;
  error: string;
};

const initialState: PhonesState = {
  phones: [],
  loading: false,
  error: '',
};

export const fetchPhones = createAsyncThunk('phones/fetch', () => {
  return getProductsByCategory<Phone[]>(Category.Phones);
});

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Phone[]>) => {
      state.phones = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhones.fulfilled, (state, action) => {
      state.phones = action.payload.slice(0, 8);
      state.loading = false;
    });

    builder.addCase(fetchPhones.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchPhones.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const { reducer, actions } = phonesSlice;
