import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        item => item.product.id === action.payload.id,
      );

      if (index === -1) {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(
        item => item.product.id !== action.payload,
      );
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.product.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.product.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
