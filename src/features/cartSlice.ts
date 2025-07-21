/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accessory } from '../types';

type CartState = {
  cart: Accessory[];
  loading: boolean;
  error: string;
};

const initialState: CartState = {
  cart: [],
  loading: false,
  error: '',
};

const accessoriesSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Accessory[]>) => {
      state.cart = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { reducer, actions } = accessoriesSlice;
