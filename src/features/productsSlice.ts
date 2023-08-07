import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Products';

type ProductsState = {
  products: Product[],
};

const InitialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: InitialState,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { set } = productsSlice.actions;
