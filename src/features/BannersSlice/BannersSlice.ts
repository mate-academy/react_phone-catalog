import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBanners } from '../../api/fetchBanners';
import { Banner } from '../../api/fetchBanners';

export interface Banners {
  banners: Banner[];
  loading: boolean;
  error: boolean;
}

const initialState: Banners = {
  banners: [],
  loading: false,
  error: false,
};

export const loadBanners = createAsyncThunk('banners/loadBanners', async () => {
  const banners = await getBanners();

  return banners;
});

export const BannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadBanners.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadBanners.fulfilled,
        (state, action: PayloadAction<Banner[]>) => {
          return { ...state, banners: action.payload, loading: false };
        },
      )
      .addCase(loadBanners.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default BannersSlice.reducer;
