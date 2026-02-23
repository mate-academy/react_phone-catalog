/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

export type CartItem = {
  itemId: string;
  image: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: loadFromStorage<CartItem[]>('cart', []),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        itemId: string;
        image: string;
        category: string;
        name: string;
        price: number;
        quantity: number;
      }>,
    ) {
      const existingItem = state.items.find(
        item => item.itemId === action.payload.itemId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        item => item.itemId === action.payload,
      );

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          item => item.itemId !== action.payload,
        );
      } else {
        existingItem.quantity -= 1;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
