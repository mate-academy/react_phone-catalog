/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';

type ProductInfoState = {
  productInfo: ProductDetails | null,
  selectedCapacity: string | null,
  selectedColor: string | null,
};

const InitialState: ProductInfoState = {
  productInfo: null,
  selectedCapacity: null,
  selectedColor: null,
};

const productsSlice = createSlice({
  name: 'productInfo',
  initialState: InitialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductDetails>) => {
      state.productInfo = action.payload;
    },
    setCapacity: (state, action: PayloadAction<string>) => {
      state.selectedCapacity = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { setProduct, setCapacity, setColor } = productsSlice.actions;
