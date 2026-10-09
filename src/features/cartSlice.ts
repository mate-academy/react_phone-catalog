/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../interface/interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item =>
          item.product.itemId === action.payload.itemId ||
          item.product.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(
        item =>
          item.product.itemId !== action.payload &&
          item.product.id !== action.payload,
      );
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) => {
      const item = state.items.find(
        i =>
          i.product.itemId === action.payload.id ||
          i.product.id === action.payload.id,
      );

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: state => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify([]));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
