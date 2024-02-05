import { createSlice } from '@reduxjs/toolkit';
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

  },
});

export default productsSlice.reducer;
