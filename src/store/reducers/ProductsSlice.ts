import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product';

interface ProductsState {
  products: Product[],
  isLoading: boolean,
  error: string,
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetching(state) {
      return { ...state, isLoading: true };
    },
    productsFetchingSuccess(state, action: PayloadAction<Product[]>) {
      return {
        ...state,
        isLoading: false,
        error: '',
        products: action.payload,
      };
    },
    productsFetchingError(state, action: PayloadAction<string>) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});

export default productsSlice.reducer;
