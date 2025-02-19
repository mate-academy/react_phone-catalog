import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopItem } from '../../types/ShopItem';

import { getPhones } from '../../api/phones';

export interface Phones {
  phones: ShopItem[];
  loading: boolean;
  error: boolean;
}

const initialState: Phones = {
  phones: [],
  loading: false,
  error: false,
};

export const loadPhones = createAsyncThunk('phones/loadPhones', async () => {
  const phones = await getPhones();

  return phones;
});

export const favIdsSlice = createSlice({
  name: 'Phones',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadPhones.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadPhones.fulfilled,
        (state, action: PayloadAction<ShopItem[]>) => {
          return { ...state, phones: action.payload, loading: false };
        },
      )
      .addCase(loadPhones.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default favIdsSlice.reducer;
