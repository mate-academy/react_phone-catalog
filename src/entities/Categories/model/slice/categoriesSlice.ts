/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCountProducts } from '../services/fetchCountProducts';
import { CategoriesSchema, ICountProducts } from '../types/categoriesSchema';

const initialState: CategoriesSchema = {
  countProducts: { accessories: 0, phones: 0, tablets: 0 },
  countProductsLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCountProducts.pending, state => {
      state.countProductsLoading = true;
    });
    builder.addCase(
      fetchCountProducts.fulfilled,
      (state, acttion: PayloadAction<ICountProducts>) => {
        state.countProductsLoading = false;
        state.countProducts = acttion.payload;
      },
    );
  },
});

export const { name: categoriesSliceName } = categoriesSlice;
export const { reducer: categoriesSliceReducer } = categoriesSlice;
