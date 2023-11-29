/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

const cartProducts
  = JSON.parse(localStorage.getItem('cart') || '[]');

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: cartProducts,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cart, action.payload]),
      );
      state.cart.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.cart.find(
        item => item.id === action.payload.id
          && item.color === action.payload.color
          && item.capacity === action.payload.capacity,
      );

      const filteredList = state.cart.filter(item => item !== findItem);

      localStorage.setItem(
        'cart',
        JSON.stringify(filteredList),
      );
      state.cart = filteredList;
    },

    increaseItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cart.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capacity === action.payload.capacity,
      );

      if (findItem) {
        findItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify([...state.cart]));
      }
    },

    decreaseItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cart.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capacity === action.payload.capacity,
      );

      if (findItem) {
        findItem.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify([...state.cart]));
      }
    },

  },
});

export const {
  addCartItem,
  removeCartItem,
  increaseItem,
  decreaseItem,
} = cartSlice.actions;
export default cartSlice.reducer;
