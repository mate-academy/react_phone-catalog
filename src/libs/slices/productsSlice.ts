/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getAllProducts } from '../api/allProducts';
import { getPhones } from '../api/phones';
import { getTablets } from '../api/tablets';
import { getAccessories } from '../api/accessories';

export interface ProductsState {
  loaded: boolean,
  hasError: boolean,
  allProducts: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
}

const initialState: ProductsState = {
  loaded: false,
  hasError: false,
  allProducts: [],
  phones: [],
  tablets: [],
  accessories: [],
};

export const fetchAll = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const products = await getAllProducts();

    return products;
  },
);

export const fetchPhones = createAsyncThunk(
  'products/fetchPhones',
  async () => {
    const phones = await getPhones();

    return phones;
  },
);

export const fetchTablets = createAsyncThunk(
  'products/fetchTablets',
  async () => {
    const phones = await getTablets();

    return phones;
  },
);

export const fetchAccessories = createAsyncThunk(
  'products/fetchAccessories',
  async () => {
    const phones = await getAccessories();

    return phones;
  },
);

const productsSlice = createSlice(
  {
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.allProducts = payload;
        })
        .addCase(fetchPhones.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.phones = payload;
        })
        .addCase(fetchTablets.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.tablets = payload;
        })
        .addCase(fetchAccessories.fulfilled, (state, { payload }) => {
          state.loaded = true;
          state.hasError = false;
          state.accessories = payload;
        })
        .addMatcher(
          isAnyOf(
            fetchAll.pending,
            fetchPhones.pending,
            fetchTablets.pending,
            fetchAccessories.pending,
          ),
          (state) => {
            state.loaded = false;
            state.hasError = false;
          },
        )
        .addMatcher(
          isAnyOf(
            fetchAll.rejected,
            fetchPhones.rejected,
            fetchTablets.rejected,
            fetchAccessories.rejected,
          ),
          (state) => {
            state.loaded = true;
            state.hasError = false;
          },
        );
    },
  },
);

export default productsSlice.reducer;
