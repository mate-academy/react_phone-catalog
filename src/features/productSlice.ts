/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gadget } from '../types/Gadget';

export interface GadgetsState {
  items: Gadget[];
  error: string | null;
}

const initialState: GadgetsState = {
  items: [],
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Gadget[]>) {
      state.items = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;
