/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gadget } from '../types/Gadget';
import { getProducts } from '../services/products';

export interface GadgetsState {
  items: Gadget[];
  loading: boolean;
  error: string | null;
}

const initialState: GadgetsState = {
  items: [],
  loading: false,
  error: null,
};

export const init = createAsyncThunk<Gadget[], void>(
  'products/fetch',
  async () => {
    return getProducts();
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Gadget[]>) => {
        state.items = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Failed to fetch products';
    });
  },
});

export default productsSlice.reducer;
