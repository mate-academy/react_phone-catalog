/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const cartItems
  = JSON.parse(localStorage.getItem('cart') || '[]');

type CartState = {
  cartItems: Product[];
};

const initialState: CartState = {
  cartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cartItems, action.payload]),
      );
      state.cartItems.push(action.payload);
    },
    removeFromCard: (state, action: PayloadAction<Product>) => {
      const filteredList
        = state.cartItems.filter(product => product.id !== action.payload.id);

      localStorage.setItem(
        'cart',
        JSON.stringify(filteredList),
      );
      state.cartItems = filteredList;
    },
    addQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cartItems.find(item => item.id === action.payload);

      if (product) {
        product.quantity += 1;
        localStorage.setItem('cart', JSON.stringify([...state.cartItems]));
      }
    },
    subtractQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cartItems.find(item => item.id === action.payload);

      if (product) {
        product.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify([...state.cartItems]));
      }
    },
  },
});

export const {
  addToCart,
  addQuantity,
  subtractQuantity,
  removeFromCard,
} = cartSlice.actions;
export default cartSlice.reducer;
