import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessories } from '../api/api';
import { Model } from '../types/model';

type InitialState = {
  accessories: Model[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  accessories: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('accessories/fetch', () => {
  return getAccessories();
});

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, accessories: action.payload, loaded: false };
    });

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export default accessoriesSlice.reducer;
