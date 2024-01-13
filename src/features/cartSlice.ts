/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../helpers/types/ProductType';

type CartState = {
  cartedProducts: ProductType [],
  count: Record<string, number>,
  totalPrice: number,
};

const initialState: CartState = {
  cartedProducts: [],
  count: {},
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      state.cartedProducts.push(action.payload);
      state.count[action.payload.id] = 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartedProducts = state.cartedProducts
        .filter(prod => prod.id !== action.payload);
      delete state.count[action.payload];
    },
    increaseCount: (state, action: PayloadAction<string>) => {
      if (action.payload in state.count) {
        state.count[action.payload] += 1;
      } else {
        state.count[action.payload] = 1;
      }
    },
    decreaseCount: (state, action: PayloadAction<string>) => {
      if (action.payload in state.count) {
        state.count[action.payload] -= 1;
      }
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
} = cartSlice.actions;
