import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopItem } from '../../types/ShopItem';

import { getAccessories } from '../../api/fetchProducts';

export interface Accessories {
  accessories: ShopItem[];
  loading: boolean;
  error: boolean;
}

const initialState: Accessories = {
  accessories: [],
  loading: false,
  error: false,
};

export const loadAccessories = createAsyncThunk('accessories/loadAccessories', async () => {
  const accessories = await getAccessories();

  return accessories;
});

export const AccessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadAccessories.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadAccessories.fulfilled,
        (state, action: PayloadAction<ShopItem[]>) => {
          return { ...state, accessories: action.payload, loading: false };
        },
      )
      .addCase(loadAccessories.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default AccessoriesSlice.reducer;
