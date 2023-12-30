/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../helpers/types/ProductType';

const initialState: ProductType[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (cartedProducts, action: PayloadAction<ProductType>) => {
      cartedProducts.push(action.payload);
    },
    removeFromCart: (cartedProducts, action: PayloadAction<string>) => {
      return cartedProducts
        .filter(prod => prod.id !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
