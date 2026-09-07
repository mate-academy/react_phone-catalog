/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTablets } from '@services/tablets';
import { ProductDetails } from '@sTypes/ProductDetails';

export const NAME = 'tablets';

type State = {
  error: string;
  isLoaded: boolean;
  isLoading: boolean;

  productsDetails: ProductDetails[];
};

const initialState: State = {
  error: '',
  isLoaded: false,
  isLoading: false,

  productsDetails: [],
};

export const loadTablets = createAsyncThunk(`${NAME}/loadProducts`, () => {
  return getTablets();
});

const tabletSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loadTablets.pending, state => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(
      loadTablets.fulfilled,
      (state, action: PayloadAction<ProductDetails[]>) => {
        state.isLoaded = true;
        state.isLoading = false;
        state.productsDetails = action.payload;
      },
    );

    builder.addCase(loadTablets.rejected, state => {
      state.isLoading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default tabletSlice.reducer;
