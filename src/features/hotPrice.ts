import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHotPrices } from '../api/api';
import { Product } from '../types/product';

type InitialState = {
  hotPrice: Product[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  hotPrice: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('hotPrice/fetch', () => {
  return getHotPrices();
});

export const hotPriceSlice = createSlice({
  name: 'hotPrice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });

    builder.addCase(
      init.fulfilled,
      (state: InitialState, action: PayloadAction<Product[]>) => {
        return { ...state, hotPrice: action.payload, loaded: false };
      },
    );

    builder.addCase(init.rejected, state => {
      return { ...state, loaded: true };
    });
  },
});

export default hotPriceSlice.reducer;
