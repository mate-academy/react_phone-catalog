import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/CartItem';
import { RootState } from '../store';

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
    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existing = state.items.find(item => item.itemId === itemId);

      if (!existing) {
        state.items.push({ itemId, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.itemId === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    reduceQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.itemId === action.payload);

      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1);
      }

      state.items = state.items.filter(item => item.quantity > 0);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectIsInCart = (productId: string) => (state: RootState) =>
  state.cart.items.some(item => item.itemId === productId);

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  reduceQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
