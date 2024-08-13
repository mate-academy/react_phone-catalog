import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type ProductInfo = {
  product: TabAccessPhone | undefined;
};

const initialState: ProductInfo = {
  product: undefined,
};

const productInfoSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductInfo: (
      state,
      action: PayloadAction<TabAccessPhone | undefined>,
    ) => {
      const currentState = state;
      currentState.product = action.payload;
    },
  },
});

export const selectedInfoProduct = (state: RootState) =>
  state.selectedProduct.product;
export const { setProductInfo } = productInfoSlice.actions;
export default productInfoSlice.reducer;
