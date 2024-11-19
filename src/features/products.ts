import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const initialState: Product[] = JSON.parse(
  localStorage.getItem('products') || '[]',
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (_: Product[], action: PayloadAction<Product[]>) => {
      localStorage.setItem('products', JSON.stringify(action.payload));

      return action.payload;
    },
  },
});
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
