/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductPageSchema } from '../types/ProductPageSchema';
import {
  ProductsSortField,
  ProductsSortPerPage,
} from '../../../../shared/const';
import { prepareProductsList } from '../services/prepareProductsList';
import { Product } from '../../../../entities/Product';

const initialState: ProductPageSchema = {
  productsCount: 0,
  preparedProducts: [],
  isloading: true,
  error: false,
  perPage: ProductsSortPerPage.ALL,
  sort: ProductsSortField.NEWEST,
  pagesCount: 1,
  currentPage: 1,
  search: '',
};

export const productPageSlice = createSlice({
  name: 'productsPage',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<ProductsSortField>) => {
      state.sort = action.payload;
    },
    setPerPage: (state, action: PayloadAction<ProductsSortPerPage>) => {
      state.perPage = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload.toLocaleLowerCase();
    },
    setPagesCount: (state, action: PayloadAction<number>) => {
      state.pagesCount = action.payload;
    },
    setProductsCount: (state, action: PayloadAction<number>) => {
      state.productsCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      prepareProductsList.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.preparedProducts = action.payload;
        state.isloading = false;
      },
    );
    builder.addCase(prepareProductsList.pending, state => {
      state.error = false;
      state.isloading = true;
    });
    builder.addCase(prepareProductsList.rejected, state => {
      state.isloading = false;
      state.error = true;
    });
  },
});

export const { name: productPageSliceName } = productPageSlice;
export const { reducer: productPageSliceReducer } = productPageSlice;
export const { actions: productPageSliceActions } = productPageSlice;
