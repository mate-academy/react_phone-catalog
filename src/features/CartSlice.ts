/* eslint-disable */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/products';
import { saveToLocalStorage } from '../components/utils/saveToLocalStorege';
import { loadItemsLocalStorage } from '../components/utils/loadItemsLocalStorage';

export type CartItem = Product & { quantity: number };

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  cartItems: loadItemsLocalStorage('cart'),
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const findItem = state.cartItems.find(
        item => item.id === action.payload.id,
      );

      if (!findItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        saveToLocalStorage('cart', state.cartItems);
      } else {
        findItem.quantity += 1;
      }
    },
    clearOneItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
      saveToLocalStorage('cart', state.cartItems);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload);

      if (findItem) {
        findItem.quantity += 1;
      }

      saveToLocalStorage('cart', state.cartItems);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload);

      if (findItem && findItem.quantity > 1) {
        findItem.quantity -= 1;
      }

      saveToLocalStorage('cart', state.cartItems);
    },
    clearAllCartItem: state => {
      state.cartItems = [];
      saveToLocalStorage('cart', state.cartItems);
    },
  },
});

export const {
  addToCart,
  clearAllCartItem,
  clearOneItem,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
