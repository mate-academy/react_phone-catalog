/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.products.some(item => item.id === action.payload.id)) {
        state.products.push({
          id: action.payload.id,
          quantity: 1,
          product: action.payload,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload,
      );
    },
    clearCart: state => {
      state.products = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const product = state.products.find(
        prod => prod.id === action.payload.id,
      );

      if (product) {
        const newQuantity = product.quantity + action.payload.quantity;

        if (newQuantity > 0) {
          product.quantity = newQuantity;
        }
      }
    },
  },
});

export const selectToCart = (state: RootState) => state.cart.products;

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
