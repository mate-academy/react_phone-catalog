import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

const initialState: CartItem[] = JSON.parse(
  localStorage.getItem('cartItems') || '[]',
);

const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const productToAdd = action.payload;
      const existingCartItem = state.find(item => item.id === productToAdd.id);

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const itemIdToIncrease = action.payload;
      const itemToIncrease = state.find(item => item.id === itemIdToIncrease);

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }

      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const itemIdToDecrease = action.payload;
      const itemToDecrease = state.find(item => item.id === itemIdToDecrease);

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      }

      localStorage.setItem('cartItems', JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart, removeFromCart, increaseQuantity, decreaseQuantity,
} = cartSlice.actions;
