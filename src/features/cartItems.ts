/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export interface CartItem extends Product {
  quantity: number;
}

const storedCartItems = localStorage.getItem('cartItems');
const initialState = {
  items: storedCartItems
    ? (JSON.parse(storedCartItems) as CartItem[])
    : ([] as CartItem[]),
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 } as CartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (cartItem: CartItem) => cartItem.id !== action.payload,
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const currentItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id,
      );

      if (currentItem && action.payload.quantity > 0) {
        currentItem.quantity = action.payload.quantity;
      } else if (currentItem) {
        state.items = state.items.filter(
          (item: CartItem) => item.id !== action.payload.id,
        );
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
