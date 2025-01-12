/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types/Device';

const DATA_LINK = 'https://ab760e2cb2ffdd0c.mokky.dev/tablets';

export interface TabletsState {
  tablets: Device[];
  error: boolean;
  loading: boolean;
}

const initialState: TabletsState = {
  tablets: [],
  error: false,
  loading: true,
};

export const fetchTablets = createAsyncThunk('tablets/fetch', async () => {
  const response = await fetch(DATA_LINK);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const tablets = await response.json();

  return tablets as Device[];
});

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTablets.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchTablets.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.tablets = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(fetchTablets.rejected, state => {
      state.tablets = [];
      state.error = true;
      state.loading = false;
    });
  },
});

export default tabletsSlice.reducer;
