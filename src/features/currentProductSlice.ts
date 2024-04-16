/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';

export interface CurentProductState {
  currentProduct: ProductDetails | null;
}

const initialState: CurentProductState = {
  currentProduct: null,
};

const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<ProductDetails>) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { setCurrentProduct } = currentProductSlice.actions;
export default currentProductSlice.reducer;
