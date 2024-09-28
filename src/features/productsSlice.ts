import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';

export interface InitialStateType {
  products: ProductType[];
}

const initialState: InitialStateType = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (
      state: InitialStateType,
      action: PayloadAction<ProductType[]>,
    ) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
