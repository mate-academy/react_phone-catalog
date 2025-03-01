import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopItem } from '../../types/ShopItem';

import { getTablets } from '../../api/fetchProducts';

export interface Tablets {
  tablets: ShopItem[];
  loading: boolean;
  error: boolean;
}

const initialState: Tablets = {
  tablets: [],
  loading: false,
  error: false,
};

export const loadTablets = createAsyncThunk('tablets/loadTablets', async () => {
  const tablets = await getTablets();

  return tablets;
});

export const TabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadTablets.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadTablets.fulfilled,
        (state, action: PayloadAction<ShopItem[]>) => {
          return { ...state, tablets: action.payload, loading: false };
        },
      )
      .addCase(loadTablets.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default TabletsSlice.reducer;
