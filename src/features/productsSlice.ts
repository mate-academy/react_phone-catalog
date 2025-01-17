import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ProductsState = {
  products: Product[];
};

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
