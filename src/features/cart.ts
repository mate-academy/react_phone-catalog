/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface CartState {
  items: Product[];
}

const loadCartFromLocaleStorage = (): Product[] => {
  const storedCarts = localStorage.getItem('carts');

  return storedCarts ? JSON.parse(storedCarts) : [];
};

const initialState: CartState = {
  items: loadCartFromLocaleStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts(state, action) {
      state.items = [...state.items, ...action.payload];

      localStorage.setItem('carts', JSON.stringify(state.items));
    },
    deleteCarts(state, action) {
      state.items = state.items.filter(
        item => item.itemId !== action.payload && item.id !== action.payload,
      );

      localStorage.setItem('carts', JSON.stringify(state.items));
    },
    addCase(state, action) {
      const existingItem = state.items.find(
        product => product.id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        localStorage.setItem('carts', JSON.stringify(state.items));
      }
    },
    decreaseCase(state, action) {
      const existingItem = state.items.find(
        product => product.id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) - 1;
        localStorage.setItem('carts', JSON.stringify(state.items));
      }
    },
    clearCase(state) {
      state.items = [];
      localStorage.setItem('carts', JSON.stringify(state.items));
    },
  },
});

export const { setCarts, deleteCarts, addCase, decreaseCase, clearCase } =
  cartSlice.actions;
export default cartSlice.reducer;
