import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBrandNewModels } from '../api/api';
import { Product } from '../types/product';

type InitialState = {
  brandNew: Product[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  brandNew: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('brandNew/fetch', () => {
  return getBrandNewModels();
});

export const brandNewSlice = createSlice({
  name: 'brandNew',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(
      init.fulfilled,
      (state: InitialState, action: PayloadAction<Product[]>) => {
        return { ...state, brandNew: action.payload, loaded: false };
      },
    );

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: true };
    });
  },
});

export default brandNewSlice.reducer;
