/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { ProductType } from '../Helpers/enumProductType';
import { ProductDetailes } from '../types/ProductDetailType';
import { Product } from '../types/productType';
import { getProducts } from '../api';

export const loadProducts = createAsyncThunk(
  'products/loadProducs',
  async (type: ProductType) => {
    const data = await getProducts('/products.json');

    return data.filter(
      (phone: { category: string }) => phone.category === type,
    );
  },
);

export const loadProductsDetail = createAsyncThunk(
  'products/loadProductsDetails',
  async (type: ProductType) => {
    let apiUrl = '';

    if (type === 'phones') {
      apiUrl = '/phones.json';
    } else if (type === 'tablets') {
      apiUrl = '/tablets.json';
    } else if (type === 'accessories') {
      apiUrl = '/accessories.json';
    }

    const data = await getProducts(apiUrl);

    return data;
  },
);

export interface ProductState {
  products: Product[];
  productsDetails: ProductDetailes[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ProductState = {
  productsDetails: [],
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
      })
      .addCase(loadProductsDetail.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadProductsDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsDetails = action.payload;
      })
      .addCase(loadProductsDetail.rejected, state => {
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
