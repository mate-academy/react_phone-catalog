import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTablets } from '../api/api';
import { Model } from '../types/model';

type InitialState = {
  tablets: Model[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  tablets: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('tablets/fetch', () => {
  return getTablets();
});

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, tablets: action.payload, loaded: false };
    });

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export default tabletsSlice.reducer;
