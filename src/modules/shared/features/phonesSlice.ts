/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPhones } from '@services/phones';
import { ProductDetails } from '@sTypes/ProductDetails';

export const NAME = 'phones';

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

export const loadPhones = createAsyncThunk(`${NAME}/loadProducts`, () => {
  return getPhones();
});

const phonesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loadPhones.pending, state => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(
      loadPhones.fulfilled,
      (state, action: PayloadAction<ProductDetails[]>) => {
        state.isLoaded = true;
        state.isLoading = false;
        state.productsDetails = action.payload;
      },
    );

    builder.addCase(loadPhones.rejected, state => {
      state.isLoading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default phonesSlice.reducer;
