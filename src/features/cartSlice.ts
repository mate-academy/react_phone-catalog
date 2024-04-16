/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getLocalStorData,
  setLocalStorageData,
} from '../helpers/localStorageData';
import { ProductInfo } from '../types/ProductInfo';
import { CartItemType } from '../types/CartItemType';

export type CartState = {
  cartItem: CartItemType[];
};

const key = 'cart';

const initialState: CartState = {
  cartItem: getLocalStorData(key),
};

const cartSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductInfo>) => {
      state.cartItem.push({
        id: action.payload.id,
        product: action.payload,
        quantity: 1,
      });
      setLocalStorageData(key, state.cartItem);
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartItem = state.cartItem.filter(
        item => item.id !== action.payload,
      );

      setLocalStorageData(key, state.cartItem);
    },
    increase: (state, action) => {
      state.cartItem.forEach(item => {
        if (item.id === action.payload) {
          item.quantity += 1;
        }
      });

      setLocalStorageData(key, state.cartItem);
    },
    decrease: (state, action) => {
      state.cartItem.forEach((item, index) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.cartItem.splice(index, 1);
          }
        }
      });

      setLocalStorageData(key, state.cartItem);
    },
  },
});

export const { addToCart, deleteFromCart, increase, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
