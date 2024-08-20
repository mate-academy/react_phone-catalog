/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface CartState {
  cart: Product[];
  totalInCart: number;
  totalPrice: number;
  quantities: { [key: string]: number };
}

const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : [];

const initialState: CartState = {
  cart: initialCart,
  totalInCart: 0,
  totalPrice: 0,
  quantities: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (itemIndex < 0) {
        state.cart.push(action.payload);
        state.quantities[action.payload.itemId] = 1;
      } else {
        state.quantities[action.payload.itemId] += 1;
      }

      state.totalInCart += 1;
      state.totalPrice += action.payload.price;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.cart.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        const quantity = state.quantities[state.cart[index].itemId];

        state.totalPrice -= state.cart[index].price * quantity;
        delete state.quantities[state.cart[index].itemId];
        state.cart.splice(index, 1);
        state.totalInCart -= quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    increaseQuantity: (state, action: PayloadAction<Product['itemId']>) => {
      if (state.quantities[action.payload]) {
        const foundItem = state.cart.find(
          item => item.itemId === action.payload,
        );

        if (foundItem) {
          state.quantities[action.payload] += 1;
          state.totalPrice += foundItem.price;
          state.totalInCart += 1;
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action: PayloadAction<Product['itemId']>) => {
      if (
        state.quantities[action.payload] &&
        state.quantities[action.payload] > 1
      ) {
        const foundItem = state.cart.find(
          item => item.itemId === action.payload,
        );

        if (foundItem) {
          state.quantities[action.payload] -= 1;
          state.totalPrice -= foundItem.price;
          state.totalInCart -= 1;
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: state => {
      state.cart = [];
      state.totalInCart = 0;
      state.totalPrice = 0;
      state.quantities = {};
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
