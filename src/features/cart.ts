/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

interface CartState {
  items: CartItem[];
}

const loadFromStorage = (): CartItem[] => {
  try {
    const serializedState = localStorage.getItem('cart');

    if (serializedState === null) {
      return [];
    }

    return JSON.parse(serializedState) as CartItem[];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.find(item => item.id === product.itemId);

      if (!exists) {
        state.items.push({
          id: product.itemId,
          quantity: 1,
          product: product,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    clearCart: state => {
      state.items = [];
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

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalAmount = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
export const selectIsAddedToCart = (state: RootState, productId: string) =>
  state.cart.items.some(item => item.id === productId);

export default cartSlice.reducer;
