/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Product } from '../../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'cart';

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        item => item.product.itemId === action.payload.itemId,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.product.itemId !== action.payload,
      );
      saveCart(state.items);
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ itemId: string; delta: number }>,
    ) => {
      const item = state.items.find(
        i => i.product.itemId === action.payload.itemId,
      );

      if (!item) {
        return;
      }

      const newQty = item.quantity + action.payload.delta;

      if (newQty < 1) {
        return;
      }

      item.quantity = newQty;
      saveCart(state.items);
    },
    clearCart: state => {
      state.items = [];
      saveCart([]);
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.quantity * (item.product.price ?? 0),
    0,
  );

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
