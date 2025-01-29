/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@sTypes/Product';
import { getProducts } from '@services/products';
import { loadPrevState } from '@utils/loadPrevState';

export const NAME = 'products';

interface Phone extends Product {
  category: 'phones';
}

interface Tablet extends Product {
  category: 'tablets';
}

interface Accessory extends Product {
  category: 'accessories';
}

export interface Products {
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessory[];
}

type State = {
  error: string;
  isLoading: boolean;

  products: Products;
};

const getEmptyProducts = (): Products => ({
  phones: [],
  tablets: [],
  accessories: [],
});

const initialState: State = {
  error: '',
  isLoading: false,

  products: loadPrevState<Products>(NAME) || getEmptyProducts(),
};

export const loadProducts = createAsyncThunk(`${NAME}/loadProducts`, () => {
  return getProducts();
});

const productsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loadProducts.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(
      loadProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = getEmptyProducts();

        for (const product of action.payload) {
          switch (product.category) {
            case 'phones':
              state.products.phones.push(product as Phone);
              break;

            case 'tablets':
              state.products.tablets.push(product as Tablet);
              break;

            case 'accessories':
              state.products.accessories.push(product as Accessory);
              break;
          }
        }
      },
    );

    builder.addCase(loadProducts.rejected, state => {
      state.isLoading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default productsSlice.reducer;
