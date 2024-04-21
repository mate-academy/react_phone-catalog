/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* import { ProductDetails } from '../types/ProductDetails'; */
import { Product } from '../types/Product';

export interface CartState {
  cart: Product[];
  totalInCart: number;
  totalPrice: number;
}

const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : [];

const initialState: CartState = {
  cart: initialCart,
  totalInCart: 0,
  totalPrice: 0,
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
        state.totalInCart += 1;
        state.totalPrice += action.payload.price;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<Product['itemId']>) => {
      const removedItem = state.cart.find(
        item => item.itemId === action.payload,
      );

      if (removedItem) {
        state.totalPrice -= removedItem.price;
        state.cart = state.cart.filter(item => item.itemId !== action.payload);
        state.totalInCart -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
