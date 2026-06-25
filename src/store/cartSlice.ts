import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState, Product } from '../types';

const STORAGE_KEY = 'cart';

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const initialState: CartState = {
  items: loadFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.product.itemId === action.payload.itemId,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      saveToStorage(state.items);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.itemId !== action.payload,
      );
      saveToStorage(state.items);
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (i) => i.product.itemId === action.payload,
      );
      if (item) {
        item.quantity += 1;
        saveToStorage(state.items);
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (i) => i.product.itemId === action.payload,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToStorage(state.items);
      }
    },

    clearCart(state) {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
