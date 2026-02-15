import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteItem } from '../../src/constants/common';

const CART_KEY = 'cart';

const loadCartFromStorage = (): FavoriteItem[] => {
  const storedCart = localStorage.getItem(CART_KEY);

  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState: FavoriteItem[] = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItem: (state, action: PayloadAction<FavoriteItem>) => {
      const item = action.payload;
      const index = state.findIndex(cartItem => cartItem.id === item.id);

      if (index !== -1) {
        const updated = state.filter(cartItem => cartItem.id !== item.id);

        localStorage.setItem(CART_KEY, JSON.stringify(updated));

        return updated;
      } else {
        const newItem = { ...item, quantity: 1 };
        const updated = [...state, newItem];

        localStorage.setItem(CART_KEY, JSON.stringify(updated));

        return updated;
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find(prod => prod.id === action.payload);

      if (item) {
        item.quantity += 1;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find(prod => prod.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const updated = state.filter(product => product.id !== action.payload);

      localStorage.setItem(CART_KEY, JSON.stringify(updated));

      return updated;
    },
  },
});

export const {
  toggleCartItem,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
