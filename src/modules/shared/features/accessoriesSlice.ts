/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAccessories } from '@services/accessories';
import { ProductDetails } from '@sTypes/ProductDetails';

export const NAME = 'accessories';

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

export const loadAccessories = createAsyncThunk(`${NAME}/loadProducts`, () => {
  return getAccessories();
});

const accessoriesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loadAccessories.pending, state => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(
      loadAccessories.fulfilled,
      (state, action: PayloadAction<ProductDetails[]>) => {
        state.isLoaded = true;
        state.isLoading = false;
        state.productsDetails = action.payload;
      },
    );

    builder.addCase(loadAccessories.rejected, state => {
      state.isLoading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default accessoriesSlice.reducer;
