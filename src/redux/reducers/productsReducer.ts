/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getProducts } from '../thunks/product.thunk';
import { SELECT } from '../../types/Select';

type ProductState = {
  list: Product[];
  isLoading: boolean;
  hasError: boolean;
  select: SELECT.All;
  selectedProduct: null | Product;
};

const initialState: ProductState = {
  list: [],
  isLoading: false,
  hasError: false,
  select: SELECT.All,
  selectedProduct: null as Product | null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateSelect: (state, action) => {
      state.select = action.payload;
    },

    setSelectedProduct: (state, action) => {
      const selected = state.list.find(
        (product) => product.phoneId === action.payload,
      );

      state.selectedProduct = selected !== undefined ? selected : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
        const productListLength = action.payload.length;

        state.select = productListLength;
      })

      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { updateSelect, setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
