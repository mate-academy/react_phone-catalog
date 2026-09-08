import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const saved = localStorage.getItem('cart');

const initialState: Product[] = saved ? JSON.parse(saved) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Product>) => {
      state.push(payload);
    },
    remove: (state, { payload }: PayloadAction<number>) => {
      return state.filter(e => e.id !== payload);
    },
    clear: () => [],
  },
});

export default cartSlice.reducer;

export const { add, remove, clear } = cartSlice.actions;
