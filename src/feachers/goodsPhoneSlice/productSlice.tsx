/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { ProductType } from '../../services/enums';
import { Product } from '../../services/productType';

export const loadProducts = createAsyncThunk(
  'products/loadProducs',
  async (type: ProductType) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('/api/products.json');
    const data = await response.json();

    return data.filter(
      (phone: { category: string }) => phone.category === type,
    );
  },
);

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: false,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
const selectSelf = (state: { phones: ProductState }) => state;

export const selectPhones = createSelector(selectSelf, state =>
  state.phones.products.filter(item => item.category === 'phones'),
);

export default productSlice.reducer;
