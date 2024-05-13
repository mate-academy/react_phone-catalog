import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Product } from '../../type';
import { getAllDevice } from '../../api/api';

export interface InitialState {
  products: Product[],
}

export const initialState: InitialState = {
  products: [],
};

export const phonesAsync = createAsyncThunk(
  'phones/phonesAsync',
  async () => {
    const response = await getAllDevice();

    return response;
  },
);
/* eslint no-param-reassign: ["error", { "props": false }] */

export const phonesReducer = createSlice({
  name: 'phones',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(phonesAsync.fulfilled, (state, action) => {
        state.products = action.payload.map((product: Product) => ({
          ...product,
          newPrice: product.price - ((product.price / 100) * product.discount),
        }));
      });
  },
});

export default phonesReducer.reducer;

// export const {  } = phonesReducer.actions;
