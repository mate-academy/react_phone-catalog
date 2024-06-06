import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helper';
import type { RootState } from '../../app/store';
import {
  IProduct,
  IPhone,
  IAccessories,
  ITablet,
} from '../../types';
import { filterForProducts } from '../../helper/filterForProducts';

type Products = {
  products: IProduct[],
  phones: IPhone[],
  tablets: ITablet[],
  accessories: IAccessories[],
  status: 'loading' | 'succeeded' | 'error',
  error: string | null;
};

const initialState: Products = {
  phones: [],
  tablets: [],
  accessories: [],
  products: [],
  status: 'loading',
  error: null,
};

export const fetchProducts = createAsyncThunk<{
  phones: IPhone[],
  tablets: ITablet[],
  accessories: IAccessories[],
  products: IProduct[]
}>(
  'phones/fetchProducts',
  async () => {
    const { data } = await axios.get<IProduct[]>(`${BASE_URL}/products.json`);

    const phones = filterForProducts(data, 'phones');
    const tablets = filterForProducts(data, 'tablets');
    const accessories = filterForProducts(data, 'accessories');

    return {
      phones,
      tablets,
      accessories,
      products: data,
    };
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.phones = action.payload.phones;
        state.accessories = action.payload.accessories;
        state.tablets = action.payload.tablets;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const selectPhones = (state: RootState) => state.products.phones;
export const selectProducts = (state: RootState) => state.products.products;
export const selectTalets = (state: RootState) => state.products.tablets;
export const selectAccessories
  = (state: RootState) => state.products.accessories;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectPhonesError = (state: RootState) => state.products.error;

export default productSlice.reducer;
