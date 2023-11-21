/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/helpers/getLocalStorage';
import { Product } from '../../types/Product';
import { CartItemType } from '../../types/CartItemType';

export interface CartState {
  cartItems: CartItemType[];
}

const key = 'cartItems';
const initialState: CartState = { cartItems: getLocalStorageData(key) };

const cartSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems.push({
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      });
      setLocalStorageData(key, state.cartItems);
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      setLocalStorageData(key, state.cartItems);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity += 1;
        }
      });
      setLocalStorageData(key, state.cartItems);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity -= 1;
        }
      });
      setLocalStorageData(key, state.cartItems);
    },
  },
});

export const {
  addToCart, deleteFromCart, increaseQuantity, decreaseQuantity,
}
  = cartSlice.actions;
export default cartSlice.reducer;
