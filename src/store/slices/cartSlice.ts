/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../helpers/types/CartItemType';
import {
  localStorageService,
} from '../../helpers/funcService/localStorageService';

const key = 'cart';

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: localStorageService.getLocalStorageData(key),
};

export const cartSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      });
      localStorageService.setLocalStorageData(key, state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
      localStorageService.setLocalStorageData(key, state.cartItems);
    },
    increaseQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity += 1;
        }
      });
      localStorageService.setLocalStorageData(key, state.cartItems);
    },
    decreaseQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity -= 1;
        }
      });
      localStorageService.setLocalStorageData(key, state.cartItems);
    },
  },
});

export const {
  addToCart, removeFromCart, increaseQuantity, decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
