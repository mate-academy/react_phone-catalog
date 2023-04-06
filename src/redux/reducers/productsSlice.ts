/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../../types/ProductItem';

interface ProductsState {
  products: ProductItem[]
  isLoading: boolean
  error: string
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
    setProducts(state, action: PayloadAction<ProductItem[]>) {
      state.products = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { setProducts, setLoading, setError } = productsSlice.actions;
