import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface SelectedProduct {
  product: Product;
  previousProducts: Product[];
}

const initialState: SelectedProduct | null = null;

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (_state, action) => {
      return action.payload;
    },
    clearSelectedProduct: () => null,
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  selectedProductSlice.actions;
export default selectedProductSlice.reducer;
