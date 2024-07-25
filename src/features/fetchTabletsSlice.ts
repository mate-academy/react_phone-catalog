/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTablets } from './../api';
import { Tablet } from './../types/Tablet';

type TabletsType = {
  objects: Tablet[];
  loading: boolean;
  error: string;
};

const initialState: TabletsType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchTablesAsync = createAsyncThunk('tablets/fetch', async () => {
  const TabletsList = await getTablets();

  return TabletsList;
});

const getTablesSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchTablesAsync.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTablesAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchTablesAsync.rejected, state => {
        state.loading = false;
        state.error = 'failed to load tablets';
      });
  },
});

export default getTablesSlice.reducer;
