import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhones } from '../api/api';
import { Model } from '../types/model';

type InitialState = {
  phones: Model[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  phones: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('phones/fetch', () => {
  return getPhones();
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, phones: action.payload, loaded: false };
    });

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export default phonesSlice.reducer;
