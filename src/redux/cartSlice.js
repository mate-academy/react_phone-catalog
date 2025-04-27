/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.items
        .findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (!existingItem) {
        return;
      }

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.items = state.items.filter(item => item.id !== productId);
    },

    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (!existingItem) {
        return;
      }

      const quantityDifference = quantity - existingItem.quantity;

      existingItem.quantity = quantity;

      state.totalQuantity += quantityDifference;
      state.totalPrice += existingItem.price * quantityDifference;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const currentCartItems = (state) => state.cart.items;
export const currentCartTotalQuantity = (state) => state.cart.totalQuantity;
export const currentCartTotalPrice = (state) => state.cart.totalPrice;
export const isProductInCart = (state, productId) =>
  state.cart.items.some(item => item.id === productId);
export const { addToCart, removeFromCart,
  updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
