/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/product';

const initialState: ProductSchema = {
  products: [],
  isLoading: false,
  error: false,
  _inited: false,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const { name: ProductSliceName } = ProductSlice;
export const { reducer: ProductSliceReducer } = ProductSlice;
export const { actions: ProductSliceActions } = ProductSlice;
