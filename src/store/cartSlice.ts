/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

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
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        cartItem => cartItem.id === product.id,
      );

      if (existingItem) {
        return;
      }

      state.items.push({
        id: product.id,
        quantity: 1,
        product,
      });
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        cartItem => cartItem.id !== action.payload,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(cartItem => cartItem.id === id);

      if (itemToUpdate && quantity > 0) {
        itemToUpdate.quantity = quantity;
      }
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
