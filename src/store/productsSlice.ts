import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(_, action: PayloadAction<Product[]>) {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
