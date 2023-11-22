/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

const savedCart = localStorage.getItem('cart');

type InitialState = {
  cart: CartItem[],
  loading: boolean,
  error: boolean,
};

const initialState: InitialState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
  loading: false,
  error: false,
};

const saveToLocalStorage = (state: InitialState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
      saveToLocalStorage(state);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    increase: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map(item => (
        item.id !== action.payload
          ? item
          : { ...item, quantity: item.quantity + 1 }
      ));
      saveToLocalStorage(state);
    },
    decrease: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map(item => (
        item.id !== action.payload
          ? item
          : { ...item, quantity: item.quantity - 1 }
      ));
      saveToLocalStorage(state);
    },
  },
});

export default cartSlice.reducer;
export const {
  add, remove, increase, decrease,
} = cartSlice.actions;
