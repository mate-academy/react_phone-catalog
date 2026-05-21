import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/CartItem';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Initialize cart from localStorage
    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    // Add item to cart or increment if exists
    addToCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existing = state.items.find(item => item.itemId === itemId);

      if (!existing) {
        state.items.push({ itemId, quantity: 1 });
      }
    },
    // Remove item from cart
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
    // Increase quantity
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.itemId === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    // Decrease quantity (remove if reaches 0)
    reduceQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.itemId === action.payload);

      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1);
      }

      state.items = state.items.filter(item => item.quantity > 0);
    },
    // Clear entire cart
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  reduceQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
