import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

type CartState = {
  cart: Product[];
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
    /* eslint-disable no-param-reassign */
    set: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    /* eslint-enable no-param-reassign */
  },
});

export const { reducer, actions } = accessoriesSlice;
